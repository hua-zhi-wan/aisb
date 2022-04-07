class ABVM {
    constructor(src) {
        this.src = src;
        this.cmds = [...(src.split('\n').filter((s)=>s.search(/^\s*$/)<0).map((s)=>s.replace(/\s+/g, '')))];
        this.completed = true;
    }
    cin(input) {
        this.in = input;
        this.completed = false;
    }
    next() {
        if (this.completed === true) {
            return true;
        }
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
    aaa = aa
    aa = 
    `);
    console.log(abvm);
    abvm.cin('abaaaacd');
    while (!abvm.next()) {
        console.log(abvm.cout());
    }
})()