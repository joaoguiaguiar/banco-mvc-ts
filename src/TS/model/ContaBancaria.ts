import type { Transacao } from "../types/Transacao";

export default class ContaBancaria {
    id: number;
    titular: string;
    numeroCartao: string;
    validadeCartao: string;
    saldoDisponivel: number;
    limiteDisponivel: number;
    proximaFatura: number;
    transacoes: Array<Transacao>;
    entradasTotal: number;
    saidasTotal: number;
    private proximoIdTransacao: number;

    constructor(
        id: number,
        titular: string,
        numeroCartao: string,
        validadeCartao: string,
        saldoDisponivel: number,
        limiteDisponivel: number,
        proximaFatura: number,
        transacoesIniciais?: Array<Transacao>
    ) {
        this.id = id;
        this.titular = titular;
        this.numeroCartao = numeroCartao;
        this.validadeCartao = validadeCartao;
        this.saldoDisponivel = saldoDisponivel;
        this.limiteDisponivel = limiteDisponivel;
        this.proximaFatura = proximaFatura;
        this.transacoes = transacoesIniciais || [];
        this.entradasTotal = 0;
        this.saidasTotal = 0;
        this.proximoIdTransacao = this.transacoes.length + 1;
        
        this.calcularEntradas();
        this.calcularSaidas();
    }

    private adicionarTransacao(
        tipo: "deposit" | "retirar" | "transfer",
        valor: number,
        descricao: string
    ): void {
        const dataAtual = new Date();
        const dataFormatada = this.formatarData(dataAtual);
        
        let icone: "↑" | "↓" | "⇄";
        let sinal: "positive" | "negative";
        
        switch (tipo) {
            case "deposit":
                icone = "↑";
                sinal = "positive";
                break;
            case "retirar":
                icone = "↓";
                sinal = "negative";
                break;
            case "transfer":
                icone = "⇄";
                sinal = "negative";
                break;
        }
        
        const novaTransacao: Transacao = {
            id: this.proximoIdTransacao,
            tipo: tipo,
            descricao: descricao,
            valor: valor,
            data: dataFormatada,
            icone: icone,
            sinal: sinal
        };
        
        this.transacoes.unshift(novaTransacao);
        this.proximoIdTransacao++;
    }
    
    private formatarData(data: Date): string {
        const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");
        
        return `${dia} ${mes} ${ano} • ${horas}:${minutos}`;
    }
    
    depositar(valor: number, descricao: string): void {
        if (valor <= 0) throw new Error("Valor deve ser maior que zero");
        
        this.saldoDisponivel += valor;
        this.entradasTotal += valor;
        this.adicionarTransacao("deposit", valor, descricao);
    }
    
    sacar(valor: number, descricao: string): boolean {
        if (valor <= 0) throw new Error("Valor deve ser maior que zero");
        if (valor > this.saldoDisponivel) return false;
        
        this.saldoDisponivel -= valor;
        this.saidasTotal += valor;
        this.adicionarTransacao("retirar", valor, descricao);
        return true;
    }
    
    transferir(valor: number, destinatario: string): boolean {
        if (valor <= 0) throw new Error("Valor deve ser maior que zero");
        if (valor > this.saldoDisponivel) return false;
        
        const descricao = `Transferência para ${destinatario}`;
        
        this.saldoDisponivel -= valor;
        this.saidasTotal += valor;
        this.adicionarTransacao("transfer", valor, descricao);
        return true;
    }
    
    transferirRecebida(valor: number, remetente: string): void {
        this.saldoDisponivel += valor;
        this.entradasTotal += valor;
        
        const descricao = `Transferência recebida - ${remetente}`;
        
        this.adicionarTransacao("transfer", valor, descricao);
        const transacaoAdicionada = this.transacoes[0];
        transacaoAdicionada.sinal = "positive";
        transacaoAdicionada.icone = "⇄";
    }
    
    calcularEntradas(): number {
        let total = 0;
        for (const transacao of this.transacoes) {
            if (transacao.sinal === "positive") {
                total += transacao.valor;
            }
        }
        this.entradasTotal = total;
        return this.entradasTotal;
    }
    
    calcularSaidas(): number {
        let total = 0;
        for (const transacao of this.transacoes) {
            if (transacao.sinal === "negative") {
                total += transacao.valor;
            }
        }
        this.saidasTotal = total;
        return this.saidasTotal;
    }
    
    listarTransacoes(): Array<Transacao> {
        return this.transacoes;
    }
    
    getTotalTransacoes(): number {
        return this.transacoes.length;
    }
}