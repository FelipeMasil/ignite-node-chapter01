import { Readable } from 'node:stream'

class OneToHundredStream extends Readable { //Streams de leitura

    index = 1

    _read() {            
       const i = this.index++

        setTimeout(()=>{
            if(this.index > 100){
                this.push(null)
            }else{              
            let buf = Buffer.from(String(i))
            this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream()
})