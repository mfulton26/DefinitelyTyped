import fs = require("fs");
import os = require("os");
import path = require("path");
import cp = require("child_process");
import stripAnsi = require("strip-ansi");
import { danger, fail, markdown } from "danger";
const suggestionsDir = [os.homedir(), ".dts", "suggestions"].join("/");
const lines: string[] = [];
const missingProperty = /module exports a property named '(.+?)', which is missing/;

if (fs.existsSync(suggestionsDir)) {
    lines.push(
        "Inspecting the JavaScript source for this package found some properties that are not in the .d.ts files.",
    );
    lines.push("The check for missing properties isn't always right, so take this list as advice, not a requirement.");
    for (const suggestionFile of fs.readdirSync(suggestionsDir)) {
        const path = [suggestionsDir, suggestionFile].join("/");
        const suggestions = fs.readFileSync(path, "utf8").split("\n").map(x => JSON.parse(x)) as Array<
            { fileName: string; ruleName: string; message: string }
        >;
        const packageName = suggestionFile.slice(0, suggestionFile.indexOf(".txt"));
        const missingProperties: { [s: string]: string[] } = {};
        for (const s of suggestions) {
            const fileName = s.fileName.slice(
                s.fileName.indexOf("types/" + packageName + "/") + ("types/" + packageName + "/").length,
            );
            const match = s.message.match(missingProperty);
            const identifier = match ? match[1] : s.message;
            if (fileName in missingProperties) {
                missingProperties[fileName].push(identifier);
            } else {
                missingProperties[fileName] = [identifier];
            }
        }

        const topUnpkgURL = `https://unpkg.com/browse/${packageName}@latest/`;
        lines.push("## " + packageName + ` ([<kbd>unpkg</kbd>](${topUnpkgURL}))`);
        for (const fileName in missingProperties) {
            if (Object.keys(missingProperties).length > 1) {
                const originalJS = fileName.replace(".d.ts", ".js");
                const unpkgURL = `https://unpkg.com/browse/${packageName}@latest/${originalJS}`;
                const dtsName = packageName.replace("@", "").replace("/", "__");
                const dtsURL =
                    `https://github.com/DefinitelyTyped/DefinitelyTyped/blob/${danger.github.pr.head.sha}/types/${dtsName}/${fileName}`;

                lines.push(`### ${fileName} ([<kbd>unpkg</kbd>](${unpkgURL}), [<kbd>d.ts</kbd>](${dtsURL}))`);
            }
            const properties = missingProperties[fileName];
            lines.push(
                `was missing the following properties:
1. ` + properties.slice(0, 5).join("\n1. "),
            );
            if (properties.length > 5) {
                const extras = properties.slice(5);
                lines.push(`
<details>
<summary>as well as these ${extras.length} other properties...</summary>
<p>${extras.join(", ")}</p>
</details>
`);
            }
        }
    }
    markdown(lines.join("\n"));
}

if (danger.git.created_files.some(f => path.basename(f) === ".editorconfig")) {
    fail(
        "A nested .editorconfig file may not be added to a package on DefinitelyTyped. Please respect the root .editorconfig.",
        danger.git.created_files.find(f => path.basename(f) === ".editorconfig"),
        1,
    );
}

// Tell people that they've added @me to their lib and not themselves
const newDTSFiles = danger.git.created_files.filter(f => f.endsWith(".d.ts"));
newDTSFiles.forEach(dts => {
    const file = fs.readFileSync(dts, "utf8");
    if (file.includes("<https://github.com/me>")) {
        fail("This line should have your github username in it, not /me", dts, 3);
    }
});

function chunked<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

const unformatted = [];
const allFiles = [...danger.git.created_files, ...danger.git.modified_files];
// We batch this in chunks to avoid hitting max arg length issues.
for (const files of chunked(allFiles, 50)) {
    const result = cp.spawnSync(
        process.execPath,
        ["node_modules/dprint/bin.js", "check", ...files],
        { encoding: "utf8", maxBuffer: 100 * 1024 * 1024 },
    );
    if (result.status !== 0) {
        for (const line of result.stdout.split(/\r?\n/)) {
            const match = stripAnsi(line).match(/^from (.*):$/);
            if (match) {
                unformatted.push(path.relative(process.cwd(), match[1]));
            }
        }
    }
}

if (unformatted.length > 0) {
    const message = [
        "## Formatting",
        "",
    ];

    message.push(
        `The following files are not formatted:
1. ` + unformatted.slice(0, 5).join("\n1. "),
    );
    if (unformatted.length > 5) {
        const extras = unformatted.slice(5);
        message.push(`
<details>
<summary>as well as these ${extras.length} other files...</summary>
<p>${extras.join(", ")}</p>
</details>
`);
    }

    message.push("\nConsider running `npx dprint fmt` on these files to make review easier.");

    markdown(message.join("\n"));
}
