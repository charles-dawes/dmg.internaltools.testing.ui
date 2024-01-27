import { readFileSync, writeFileSync } from "fs";
import { dump, load } from "js-yaml";

console.log(`---App Config Script Start---\n`);

try {
    // Read data from JSON file
    const configFileName = `appConfig.json`;
    console.log(`loading data from ${configFileName}`);
    const appConfig = JSON.parse(readFileSync(configFileName, "utf-8"));
    const appName = appConfig.appName;
    console.log(`${configFileName} data loaded`);

    const generateDeploymentTemplate = () => {
        console.log("\n--generateDeploymentTemplate start--\n");

        console.log("loading data from base template");

        try {
            const baseYamlFilePath = `deployment-templates/base-template.yaml`;
            const yamlData = load(readFileSync(baseYamlFilePath, "utf-8"));

            console.log("base template data loaded");

            const newYamlFileName = `${appName}-template.yaml`;

            console.log(
                `generating new template file ${newYamlFileName} with data from base template`
            );

            const updatedYamlContent = dump(yamlData, { skipInvalid: false });
            const newYamlFilePath = `deployment-templates/${newYamlFileName}`;
            writeFileSync(newYamlFilePath, updatedYamlContent, "utf-8");

            console.log(`YAML file ${newYamlFileName} generated successfully.`);

            console.log("\n--generateDeploymentTemplate end--\n");
        } catch (error) {
            console.error(
                `Error generating deployment template: ${error.message}`
            );
        }
    };

    const updatePackageJsonName = () => {
        console.log("\n--updatePackageJsonName start--\n");

        const packageJsonFileName = "package.json";
        console.log(`updating data in ${packageJsonFileName}`);

        try {
            const packageJsonData = JSON.parse(
                readFileSync(packageJsonFileName, "utf-8")
            );
            packageJsonData.name = appName;

            const updatedPackageJsonContent = JSON.stringify(
                packageJsonData,
                null,
                2
            );
            writeFileSync(
                packageJsonFileName,
                updatedPackageJsonContent,
                "utf-8"
            );

            console.log(
                `Package.json file updated successfully. New name: ${appName}`
            );
        } catch (error) {
            console.error(
                `Error updating ${packageJsonFileName}: ${error.message}`
            );
        }

        console.log("\n--updatePackageJsonName end--\n");
    };

    generateDeploymentTemplate();
    updatePackageJsonName();
} catch (error) {
    console.error(`Error in the main script: ${error.message}`);
}

console.log(`\n---App Config Script End---`);
