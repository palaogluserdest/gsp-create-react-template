#!/usr/bin/env node

const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");
const ora = require("ora");

const packageJson = require("./package.json");

// Template variants
const TEMPLATES = {
  javascript: {
    name: "JavaScript",
    description: "Standard JavaScript template with React 19, Vite, and Formik",
  },
  typescript: {
    name: "TypeScript",
    description: "TypeScript template with React 19, Vite, and Formik",
  },
  "javascript-tailwind": {
    name: "JavaScript + Tailwind CSS",
    description:
      "JavaScript template with Tailwind CSS for utility-first styling",
  },
  "typescript-tailwind": {
    name: "TypeScript + Tailwind CSS",
    description:
      "TypeScript template with Tailwind CSS for utility-first styling",
  },
  "javascript-shadcn": {
    name: "JavaScript + ShadcnUI",
    description:
      "JavaScript template with ShadcnUI components and Tailwind CSS",
  },
  "typescript-shadcn": {
    name: "TypeScript + ShadcnUI",
    description:
      "TypeScript template with ShadcnUI components and Tailwind CSS",
  },
};

// CLI Setup
program
  .name("create-gsp")
  .description("Create a new React application with GSP template")
  .version(packageJson.version)
  .argument("[project-name]", "Name of the project")
  .option("-t, --template <template>", "Template variant to use")
  .action(async (projectName, options) => {
    console.log(
      chalk.blue.bold(
        `\n🚀 Welcome to GSP React Template Creator v${packageJson.version}\n`
      )
    );

    try {
      // Get project name
      if (!projectName) {
        const { name } = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "What is your project name?",
            validate: (input) => {
              if (!input.trim()) {
                return "Project name is required";
              }
              if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
                return "Project name can only contain letters, numbers, hyphens, and underscores";
              }
              return true;
            },
          },
        ]);
        projectName = name;
      }

      // Get template choice
      let templateChoice = options.template;
      if (!templateChoice) {
        const { template } = await inquirer.prompt([
          {
            type: "list",
            name: "template",
            message: "Which template would you like to use?",
            choices: Object.entries(TEMPLATES).map(([key, value]) => ({
              name: `${value.name} - ${value.description}`,
              value: key,
            })),
          },
        ]);
        templateChoice = template;
      }

      // Validate template choice
      if (!TEMPLATES[templateChoice]) {
        console.error(chalk.red(`❌ Invalid template: ${templateChoice}`));
        console.log(chalk.yellow("Available templates:"));
        Object.entries(TEMPLATES).forEach(([key, value]) => {
          console.log(`  - ${key}: ${value.description}`);
        });
        process.exit(1);
      }

      // Create project
      await createProject(projectName, templateChoice);
    } catch (error) {
      console.error(chalk.red("❌ Error creating project:"), error.message);
      process.exit(1);
    }
  });

async function createProject(projectName, templateChoice) {
  const targetDir = path.resolve(process.cwd(), projectName);

  // Check if directory exists
  if (await fs.pathExists(targetDir)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: `Directory ${projectName} already exists. Overwrite?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.yellow("Operation cancelled."));
      process.exit(0);
    }

    await fs.remove(targetDir);
  }

  const spinner = ora(
    `Creating ${projectName} with ${TEMPLATES[templateChoice].name} template...`
  ).start();

  try {
    // Create target directory
    await fs.ensureDir(targetDir);

    // Copy template files
    const templateDir = path.join(__dirname, "templates", templateChoice);
    await fs.copy(templateDir, targetDir);

    // Update package.json
    await updatePackageJson(targetDir, projectName, templateChoice);

    spinner.succeed(
      chalk.green(`✅ Project ${projectName} created successfully!`)
    );

    // Show next steps
    console.log(chalk.blue("\n📋 Next steps:"));
    console.log(chalk.gray(`  cd ${projectName}`));
    console.log(chalk.gray("  npm install"));
    console.log(chalk.gray("  npm run dev"));
    console.log(chalk.blue("\n🎉 Happy coding!\n"));
  } catch (error) {
    spinner.fail(chalk.red("❌ Failed to create project"));
    throw error;
  }
}

async function updatePackageJson(targetDir, projectName, templateChoice) {
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  // Update package name
  packageJson.name = projectName.toLowerCase().replace(/\s+/g, "-");

  // Add template-specific dependencies
  if (templateChoice.includes("typescript")) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      typescript: "^5.2.2",
      "@types/node": "^20.8.0",
    };
  }

  if (
    templateChoice.includes("tailwind") ||
    templateChoice.includes("shadcn")
  ) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      tailwindcss: "^3.3.0",
      autoprefixer: "^10.4.16",
      postcss: "^8.4.31",
    };
  }

  if (templateChoice.includes("shadcn")) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      "@radix-ui/react-slot": "^1.0.2",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "lucide-react": "^0.288.0",
      "tailwind-merge": "^1.14.0",
    };
  }

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    chalk.red("❌ Unhandled Rejection at:"),
    promise,
    chalk.red("reason:"),
    reason
  );
  process.exit(1);
});

program.parse();
