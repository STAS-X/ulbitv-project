import { Node, Project, SyntaxKind, JsxAttribute } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example isFeatureRating
const featureState = process.argv[3]; // example off\on

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага');
}

if (!featureState) {
    throw new Error('Укажите состояние фичи (on или off)');
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Некорректное значение состояния фичи (on или off)');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/ArticleDetailesPage.ts?');

const files = project.getSourceFiles();

function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === toggleComponentName;
}

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
    return jsxAttributes.find((attribute) => attribute.getName() === name)
}

const getReplaceComponent = (textByNode: string) => {
    if (textByNode.trim().startsWith('(')) return textByNode.trim().slice(1, -1);
    return textByNode.trim();
}

function replaceToggleComponent(node: Node) {
    const attributes = node.getDescendantsOfKind(
        SyntaxKind.JsxAttribute,
    );

    if (!attributes) return;

    const offAttribute = getAttributeNodeByName(attributes, 'off');
    const onAttribute = getAttributeNodeByName(attributes, 'on');

    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');

    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getLiteralText();

    if (featureName !== removedFeatureName) return;

    const offValue = offAttribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression();
    const onValue = onAttribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression();

    if (featureState === 'on' && onValue) {
        node.replaceWithText(getReplaceComponent(onValue.getText()));
    }

    if (featureState === 'off' && offValue) {
        node.replaceWithText(getReplaceComponent(offValue.getText()));
    }
}

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === toggleFunctionName
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

const replaceToggleFunction = (node: Node) => {

    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
    );

    if (!objectOptions) return;

    const offFunctionProperty = objectOptions.getProperty('off');
    const onFunctionProperty = objectOptions.getProperty('on');

    const featureNameProperty = objectOptions.getProperty('name');

    const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getLiteralText();

    if (featureName !== removedFeatureName) return;

    if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
    }

    if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
    }
}

files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            replaceToggleFunction(node);
        }

        if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
            replaceToggleComponent(node);
        }
    });
});

project.save();
