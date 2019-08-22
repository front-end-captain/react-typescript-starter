const { resolve } = require("path");
const stringify = require("json-stable-stringify");
const path = require("path");
const glob = require("glob");

const TJS = require("typescript-json-schema");
const REGEX_TSCONFIG_NAME = /^.*\.json$/;

// optionally pass argument to schema generator
const settings = {
  required: true,
  ignoreErrors: true,
  out: resolve(__dirname, "./src/types/types.json"),
  id: "api",
};

// optionally pass ts compiler options
const compilerOptions = {
  strictNullChecks: true,
};



function normalizeFileName(fn) {
  while (fn.substr(0, 2) === "./") {
    fn = fn.substr(2);
  }
  return fn;
}

const adaptOnlyIncludeFiles = (filePattern, args) => {
  let onlyIncludeFiles = undefined;
  let program;
  if (REGEX_TSCONFIG_NAME.test(path.basename(filePattern))) {
    if (args.include && args.include.length > 0) {
      const globs = args.include.map(function(f) {
        return glob.sync(f);
      });
      onlyIncludeFiles = (_a = []).concat.apply(_a, globs).map(normalizeFileName);
    }
    program = TJS.programFromConfig(filePattern, onlyIncludeFiles);
  } else {
    onlyIncludeFiles = glob.sync(filePattern);
    program = TJS.getProgramFromFiles(onlyIncludeFiles, {
      strictNullChecks: args.strictNullChecks,
    });
    onlyIncludeFiles = onlyIncludeFiles.map(normalizeFileName);
  }

  return onlyIncludeFiles;
};

const program = TJS.getProgramFromFiles(
  glob.sync("./src/types/*.d.ts"),
  compilerOptions,
);

// We can either get the schema for one file and one type...
const schema = TJS.generateSchema(
  program,
  "*",
  settings,
  adaptOnlyIncludeFiles("./src/types/*.d.ts", settings),
);

if (schema === null) {
  throw new Error("No output schema. Probably caused by errors prior to this?");
}
const json = stringify(schema, { space: 2 }) + "\n\n";
if (settings.out) {
  require("fs").writeFile(settings.out, json, function(err) {
    if (err) {
      throw new Error("Unable to write output file: " + err.message);
    }
  });
}

// ... or a generator that lets us incrementally get more schemas

// const generator = TJS.buildGenerator(program, settings);

// all symbols
// const symbols = generator.getUserSymbols();

// Get symbols for different types from generator.
// generator.getSchemaForSymbol("*");
// generator.getSchemaForSymbol("AnotherType");
