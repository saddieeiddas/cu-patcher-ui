import * as ts from 'typescript';
import { createFilter } from 'rollup-pluginutils';
import { statSync } from 'fs';
import assign from 'object-assign';

var resolveHost = {
    fileExists: function (filePath) {
        try {
            return statSync(filePath).isFile();
        }
        catch (err) {
            return false;
        }
    }
};
function goodErrors(diagnostic) {
    // All errors except `Cannot compile modules into 'es6' when targeting 'ES5' or lower.`
    return diagnostic.code !== 1204;
}
function typescript(options) {
    options = assign({}, options || {});
    var filter = createFilter(options.include || ['*.ts+(|x)', '**/*.ts+(|x)'], options.exclude);
    delete options.include;
    delete options.exclude;
    options = assign({
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.ES6,
        sourceMap: true
    }, options);
    console.log(options);
    return {
        resolveId: function (importee, importer) {
            if (!importer)
                return null;
            var result = ts.nodeModuleNameResolver(importee, importer, resolveHost);
            if (result.resolvedModule && result.resolvedModule.resolvedFileName) {
                return result.resolvedModule.resolvedFileName;
            }
            return null;
        },
        transform: function (code, id) {
            if (!filter(id))
                return null;
            var transformed = ts.transpileModule(code, {
                reportDiagnostics: true,
                compilerOptions: options
            });
            var diagnostics = transformed.diagnostics.filter(goodErrors);
            var fatalError = false;
            diagnostics.forEach(function (diagnostic) {
                var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                if (diagnostic.file) {
                    var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
                    console.error(diagnostic.file.fileName + "(" + (line + 1) + "," + (character + 1) + "): error ES" + diagnostic.code + ": " + message);
                }
                else {
                    console.error("Error: " + message);
                }
                if (diagnostic.category === ts.DiagnosticCategory.Error) {
                    fatalError = true;
                }
            });
            if (fatalError) {
                throw new Error("There were TypeScript errors transpiling \"" + id + "\"");
            }
            return {
                code: transformed.outputText,
                // Rollup expects `map` to be an object so we must parse the string
                map: JSON.parse(transformed.sourceMapText)
            };
        }
    };
}

export default typescript;