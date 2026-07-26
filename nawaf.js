#!/usr/bin/env node
/**
 * CPU Stresser – رفع استهلاك المعالج لأقصى حد
 * نسخة Node.js تستخدم Worker Threads لاستهلاك كل الأنوية
 */

const os = require("os");
const { Worker, isMainThread } = require("worker_threads");

function cpuStress() {
    while (true) {
        let x = 0;
        for (let i = 0; i < 1000000; i++) {
            x += i * i;
        }
    }
}

function main() {
    console.log("🔥 CPU Stresser – رفع استهلاك المعالج");
    console.log("[*] جاري استهلاك كل قدرات المعالج...");
    console.log("[!] اضغط Ctrl + C للإيقاف\n");

    const coreCount = os.cpus().length;
    const workers = [];

    for (let i = 0; i < coreCount; i++) {
        const worker = new Worker(__filename, { workerData: null });
        workers.push(worker);
    }

    process.on("SIGINT", () => {
        console.log("\n[!] تم الإيقاف بواسطتك.");
        for (const w of workers) {
            w.terminate();
        }
        process.exit(0);
    });
}

if (isMainThread) {
    main();
} else {
    cpuStress();
}
