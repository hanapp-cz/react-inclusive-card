#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";

// Use yellow color for the path
const yellow = "\x1b[33m";
const reset = "\x1b[0m";

const CMP_NAME = "InclusiveCard.tsx";
const STYLES_NAME = "InclusiveCard.css";

// Get CLI args
const args = process.argv.slice(2);
const pathArgIndex = args.findIndex((arg) => arg === "--path");

if (pathArgIndex !== -1) {
  const pathArg = args[pathArgIndex + 1];
  copyFile(pathArg);
}

if (pathArgIndex === -1) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Listen for user input
  rl.question(
    `❓ Do you want to copy the InclusiveCard component to the default path \n${yellow}src/components/${CMP_NAME}${reset}? (y/n)`,
    (answer) => {
      const normalized = answer.trim().toLowerCase();

      // If the answer is not 'y', ask for a custom path
      if (normalized !== "y") {
        rl.question(
          `📍 Please provide a path where you want to copy the component. \nExample: ${yellow}src/ui/components${reset}\n`,
          (userPath) => {
            // If the user doesn't provide a path, exit
            if (!userPath.trim()) {
              console.error("❌ No path provided. Exiting.");
              rl.close();
              process.exit(1);
            }

            // Copy the file to the user-provided path
            copyFile(userPath.trim());
            rl.close();
          }
        );
        return;
      }

      // Answer is 'y', copy to default path
      copyFile("src/components");
      rl.close();
    }
  );
}

function copyFile(userPath: string) {
  const cleanedPath = userPath.replace(/\/$/, ""); // Remove trailing slash if present

  // Paths
  const sourceFile = path.resolve(__dirname, "../src/Card.tsx");
  const sourceStyles = path.resolve(__dirname, "../src/Card.css");

  const destinationFile = path.resolve(
    process.cwd(),
    `${cleanedPath}/${CMP_NAME}`
  );

  const destinationStyles = path.resolve(
    process.cwd(),
    `${cleanedPath}/${STYLES_NAME}`
  );

  try {
    if (!fs.existsSync(sourceFile) || !fs.existsSync(sourceStyles)) {
      console.error("❌ Source component or its styles not found.");
      process.exit(1);
    }

    const destinationDir = path.dirname(destinationFile);

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    fs.copyFileSync(sourceFile, destinationFile);
    fs.copyFileSync(sourceStyles, destinationStyles);

    console.log(`✅ The Inclusive Card component copied to ${destinationFile}`);
  } catch (error) {
    console.error("❌ Failed to copy component:", error);
    process.exit(1);
  }
}
