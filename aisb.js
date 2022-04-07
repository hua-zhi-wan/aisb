class ABVM {
    constructor(src) {
        this.src = src;
        this.cmds = src.split('\n').filter((s)=>s.search(/(^\s*$)|(^\s*(#|\/\/).*$)/)<0).map((s)=>s.replace(/\s+/g, ''));
        this.completed = true;
        this.step = 0;
    }
    cin(input) {
        this.in = input;
        this.completed = false;
        this.step = 0;
    }
    next() {
        this.step += 1;
        if (this.step > 255) { return true; }
        if (this.completed === true) { return true; }
        else {
            for (const cmd of this.cmds) {
                const [left, right] = cmd.split('=');
                if (this.in.indexOf(left) >= 0) {
                    if (right.startsWith('(return)')) {
                        this.in = right.slice(8);
                        this.completed = true;
                    }
                    else {
                        this.in = this.in.replace(left, right);
                    }
                    return false;
                }
            }
            this.completed = true;
        }
        return this.completed;
    }
    cout() {
        return this.in;
    }
}


(function debug() {
    const abvm = new ABVM(`
    ab = 
    ba = 
    bb = b
    aa = a
    `);
    console.log(abvm);
    abvm.cin('abbbabababababaabaaaba');
    while (!abvm.next()) {
        console.log(abvm.cout());
    }
})()
