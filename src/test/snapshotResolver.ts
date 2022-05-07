export default {
    testPathForConsistencyCheck: "lib/test/example.test.js",

    resolveSnapshotPath: (testPath: string, snapshotExtension: string): string =>
        testPath.replace(/\blib\b/, "src").replace(/\.test\.js$/, "") + snapshotExtension,

    resolveTestPath: (snapshotPath: string, snapshotExtension: string): string =>
        snapshotPath.replace(/\bsrc\b/, "lib").slice(0, -snapshotExtension.length) + ".test.js"
};
