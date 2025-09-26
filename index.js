#!/usr/bin/env node

const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { program } = require("commander");
const ora = require("ora");

const packageJson = require("./package.json");

// Language options
const LANGUAGES = {
  javascript: {
    name: "JavaScript",
    description: "Modern JavaScript with React 19 and Vite",
  },
  typescript: {
    name: "TypeScript",
    description: "TypeScript with full type safety and better DX",
  },
};

// Router + Form library combinations
const ROUTER_FORM_OPTIONS = {
  "router-formik": {
    name: "React Router + Formik + Yup",
    description: "React Router v7 with traditional Formik forms and Yup validation",
    templatePrefix: "", // Uses current templates
  },
  "router-rhf": {
    name: "React Router + React Hook Form + Zod",
    description: "React Router v7 with modern React Hook Form and Zod validation",
    templatePrefix: "-rhf", // New templates to be created
  },
};

// Styling options
const STYLING_OPTIONS = {
  vanilla: {
    name: "Vanilla CSS",
    description: "Standard CSS with Sass preprocessing",
    templateSuffix: "",
  },
  tailwind: {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    templateSuffix: "-tailwind",
  },
  shadcn: {
    name: "Tailwind CSS + ShadcnUI",
    description: "Modern UI components built on Tailwind CSS",
    templateSuffix: "-shadcn",
  },
};

// Legacy template mapping for backward compatibility
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
            message:
              "What is your project name? (use '.' for current directory)",
            validate: (input) => {
              if (!input.trim()) {
                return "Project name is required";
              }
              if (input.trim() === ".") {
                return true; // Allow dot for current directory
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

      // Handle dot notation for current directory
      if (projectName === ".") {
        projectName = path.basename(process.cwd());
        console.log(chalk.cyan(`Using current directory name: ${projectName}`));
      }

      // Get template choice through nested selection
      let templateChoice = options.template;
      if (!templateChoice) {
        // Step 1: Choose language
        const { language } = await inquirer.prompt([
          {
            type: "list",
            name: "language",
            message: "🌐 Choose your language:",
            choices: Object.entries(LANGUAGES).map(([key, value]) => ({
              name: `${value.name} - ${value.description}`,
              value: key,
            })),
          },
        ]);

        // Step 2: Choose router and form combination
        const { routerForm } = await inquirer.prompt([
          {
            type: "list",
            name: "routerForm",
            message: "🧭 Choose your routing and form handling:",
            choices: Object.entries(ROUTER_FORM_OPTIONS).map(([key, value]) => ({
              name: `${value.name} - ${value.description}`,
              value: key,
            })),
          },
        ]);

        // Step 3: Choose styling approach
        const { styling } = await inquirer.prompt([
          {
            type: "list",
            name: "styling",
            message: "🎨 Choose your styling approach:",
            choices: Object.entries(STYLING_OPTIONS).map(([key, value]) => ({
              name: `${value.name} - ${value.description}`,
              value: key,
            })),
          },
        ]);

        // Construct template choice based on selections
        const routerFormConfig = ROUTER_FORM_OPTIONS[routerForm];
        const stylingConfig = STYLING_OPTIONS[styling];
        
        templateChoice = language + routerFormConfig.templatePrefix + stylingConfig.templateSuffix;
        
        console.log(chalk.cyan(`\n✨ Selected configuration:`));
        console.log(chalk.white(`   Language: ${LANGUAGES[language].name}`));
        console.log(chalk.white(`   Router + Forms: ${routerFormConfig.name}`));
        console.log(chalk.white(`   Styling: ${stylingConfig.name}`));
        console.log(chalk.white(`   Template: ${templateChoice}\n`));

        // Check if React Hook Form templates exist
        if (routerForm === "router-rhf") {
          console.log(chalk.yellow("ℹ️  React Hook Form + Zod templates coming in v1.2.0!"));
          console.log(chalk.yellow("   Using React Router + Formik + Yup for now...\n"));
          // Fallback to Formik templates for now
          templateChoice = language + stylingConfig.templateSuffix;
        }
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
  let targetDir;
  let isCurrentDir = false;

  // Check if user wants to use current directory
  const currentDirName = path.basename(process.cwd());
  if (projectName === currentDirName) {
    const { useCurrentDir } = await inquirer.prompt([
      {
        type: "confirm",
        name: "useCurrentDir",
        message: `Create project in current directory (${process.cwd()})?`,
        default: true,
      },
    ]);

    if (useCurrentDir) {
      targetDir = process.cwd();
      isCurrentDir = true;
    } else {
      targetDir = path.resolve(process.cwd(), projectName);
    }
  } else {
    targetDir = path.resolve(process.cwd(), projectName);
  }

  // Check if directory exists and is not empty (for non-current directory)
  if (!isCurrentDir && (await fs.pathExists(targetDir))) {
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

  // For current directory, check if it's empty or ask for confirmation
  if (isCurrentDir) {
    const files = await fs.readdir(targetDir);
    const nonHiddenFiles = files.filter((file) => !file.startsWith("."));

    if (nonHiddenFiles.length > 0) {
      const { proceed } = await inquirer.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: `Current directory is not empty. Continue anyway?`,
          default: false,
        },
      ]);

      if (!proceed) {
        console.log(chalk.yellow("Operation cancelled."));
        process.exit(0);
      }
    }
  }

  const spinner = ora(
    `Creating ${projectName} with ${TEMPLATES[templateChoice].name} template...`
  ).start();

  try {
    // Create target directory (if not current dir)
    if (!isCurrentDir) {
      await fs.ensureDir(targetDir);
    }

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
    if (!isCurrentDir) {
      console.log(chalk.gray(`  cd ${projectName}`));
    }
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
      "lucide-react": "^0.544.0",
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
