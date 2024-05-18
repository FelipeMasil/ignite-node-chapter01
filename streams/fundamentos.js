

    import { Readable, Writable, Transform } from 'node:stream'

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

    class InverseNumber extends Transform {
        _transform(chunk, encoding, callback){
            const transformed = Number(chunk.toString()) * -1
            callback(null, Buffer.from(String(transformed)))
        }
    }

    class MultiplyByTenStream extends Writable{ 

        _write(chunk, encoding, callback){
            console.log(Number(chunk.toString())*10)
            callback()
        }
    }

    new OneToHundredStream() //Stream de leitura
        .pipe(new InverseNumber()) // A stream de transformação 'obrigatóriamente' precisa estar entre a leitura e de escrita
        .pipe(new MultiplyByTenStream()) //Stream de escrita

        /**
         *  O que eu entendi?
         *      Stream resolvem o problema de processamento de arquivos grandes;
         *      Não é necessário carregar todo arquivo para que ele começe a ser processado;
         *      Streams são caminhos de entrada e saida constantemente abertos na aplicação;
         *      Como exemplo, em uma API usando node:http o req e o res são stream de entrada e saida;
         *      Chunks são os pedaços enviados pela stream, geralmente são Buffer
         */