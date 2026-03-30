
export class Validators {
    static valor(valor: number): boolean {
        return !isNaN(valor) && valor > 0;
    }
    
    static saldoSuficiente(saldo: number, valor: number): boolean {
        return saldo >= valor;
    }
    
    static descricao(texto: string): boolean {
        return texto.trim().length > 0;
    }
    
    static destinatario(nome: string): boolean {
        return nome.trim().length >= 3;
    }
}