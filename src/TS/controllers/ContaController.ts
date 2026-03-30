import ContaBancaria from "../model/ContaBancaria";
import type { Transacao } from "../types/Transacao";

export class ContaController {
    private conta: ContaBancaria;

    constructor(conta: ContaBancaria) {
        this.conta = conta;
    }

    getSaldo(): number {
        return this.conta.saldoDisponivel;
    }

    getTitular(): string {
        return this.conta.titular;
    }

    getNumeroCartao(): string {
        return this.conta.numeroCartao;
    }

    getValidadeCartao(): string {
        return this.conta.validadeCartao;
    }

    getLimiteDisponivel(): number {
        return this.conta.limiteDisponivel;
    }

    getProximaFatura(): number {
        return this.conta.proximaFatura;
    }

    getEntradasTotal(): number {
        return this.conta.entradasTotal;
    }

    getSaidasTotal(): number {
        return this.conta.saidasTotal;
    }

    getTransacoes(): Transacao[] {
        return this.conta.listarTransacoes();
    }

    getTotalTransacoes(): number {
        return this.conta.getTotalTransacoes();
    }

    realizarDeposito(valor: number, descricao: string): boolean {
        try {
            this.conta.depositar(valor, descricao);
            this.atualizarView();
            return true;
        } catch (error) {
            console.error("Erro no depósito:", error);
            alert("Erro ao realizar depósito: " + (error as Error).message);
            return false;
        }
    }

    realizarSaque(valor: number, descricao: string): boolean {
        try {
            const sucesso = this.conta.sacar(valor, descricao);
            if (sucesso) {
                this.atualizarView();
                return true;
            } else {
                alert("Saldo insuficiente!");
                return false;
            }
        } catch (error) {
            console.error("Erro no saque:", error);
            alert("Erro ao realizar saque: " + (error as Error).message);
            return false;
        }
    }

    realizarTransferencia(valor: number, destinatario: string): boolean {
        try {
            const sucesso = this.conta.transferir(valor, destinatario);
            if (sucesso) {
                this.atualizarView();
                return true;
            } else {
                alert("Saldo insuficiente!");
                return false;
            }
        } catch (error) {
            console.error("Erro na transferência:", error);
            alert("Erro ao realizar transferência: " + (error as Error).message);
            return false;
        }
    }

    private atualizarView(): void {
        const event = new CustomEvent('contaAtualizada', { 
            detail: { 
                saldo: this.getSaldo(),
                entradas: this.getEntradasTotal(),
                saidas: this.getSaidasTotal(),
                totalTransacoes: this.getTotalTransacoes(),
                transacoes: this.getTransacoes()
            } 
        });
        window.dispatchEvent(event);
    }
}