import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function ExportTransactionToPdf(transaction) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`Movimentação ID: ${transaction.idMovimentacao}`, 14, 20);
  doc.text(
    `Data: ${transaction.dataMovimentacao.toLocaleDateString()}`,
    14,
    30
  );
  doc.text(
    `Tipo: ${transaction.tipoMovimentacao === 1 ? "Entrada" : "Saída"}`,
    14,
    40
  );
  doc.text(`Processado: ${transaction.processado ? "Sim" : "Não"}`, 14, 50);

  const tableColumn = [
    "Produto",
    "Processado",
    "Quantidade",
    "Quebras",
    "Cortesias",
  ];
  const tableRows = [];

  transaction.itens.forEach((item) => {
    const row = [
      item.nomeProduto,
      item.processado ? "Sim" : "Não",
      item.quantidadeMovimentacao.toString(),
      item.quebras.toString(),
      item.cortesias.toString(),
    ];
    tableRows.push(row);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 60,
  });

  doc.save(`movimentacao_${transaction.idMovimentacao}.pdf`);
}

export function ExportAllTransactionsToPdf(transactions) {
  const doc = new jsPDF();

  transactions.forEach((transaction, index) => {
    if (index > 0) {
      doc.addPage(); // add a new page for every transaction after the first
    }

    doc.setFontSize(14);
    doc.text(`Movimentação ID: ${transaction.idMovimentacao}`, 14, 20);
    doc.text(
      `Data: ${transaction.dataMovimentacao.toLocaleDateString()}`,
      14,
      30
    );
    doc.text(
      `Tipo: ${transaction.tipoMovimentacao === 1 ? "Entrada" : "Saída"}`,
      14,
      40
    );
    doc.text(`Processado: ${transaction.processado ? "Sim" : "Não"}`, 14, 50);

    const tableColumn = [
      "Produto",
      "Processado",
      "Quantidade",
      "Quebras",
      "Cortesias",
    ];
    const tableRows = [];

    transaction.itens.forEach((item) => {
      const row = [
        item.nomeProduto,
        item.processado ? "Sim" : "Não",
        item.quantidadeMovimentacao.toString(),
        item.quebras.toString(),
        item.cortesias.toString(),
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60,
    });
  });

  doc.save("movimentacoes.pdf");
}

export function ExportAllStockClosuresToPdf(stockClosures) {
  const doc = new jsPDF();

  stockClosures.forEach((closure, index) => {
    if (index > 0) {
      doc.addPage(); // Add a new page for each closure after the first
    }

    doc.setFontSize(14);
    doc.text(`Fechamento ID: ${closure.idFechamento}`, 14, 20);
    doc.text(`Estoque ID: ${closure.idEstoque}`, 14, 30);
    doc.text(`Data de Fechamento: ${closure.dataFechamento}`, 14, 40);
    doc.text(`Início do Período: ${closure.dataInicioPeriodo}`, 14, 50);
    doc.text(`Final do Período: ${closure.dataFinalPeriodo}`, 14, 60);
    doc.text(`Erro: ${closure.erro ? "Sim" : "Não"}`, 14, 70);

    const tableColumn = [
      "Produto",
      "Qtd Final",
      "Divergência",
      "Qtd Divergência",
      "Quebras",
      "Cortesias",
    ];
    const tableRows = [];

    closure.itens.forEach((item) => {
      const row = [
        item.nomeProduto,
        item.quantidadeFinal.toString(),
        item.divergencia ? "Sim" : "Não",
        item.quantidadeDivergencia.toString(),
        item.quebrasContabilizadas.toString(),
        item.cortesias.toString(),
      ];
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
    });
  });

  doc.save("fechamentos-estoque.pdf");
}

export function ExportAllProductsToPdf(productList) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Lista de Produtos", 14, 20);

  const tableColumn = [
    "Produto",
    "Marca",
    "Responsável",
    "Validade",
    "Quantidade",
    "Valor (R$)",
    "Promoção",
  ];
  const tableRows = [];

  productList.forEach((product) => {
    const row = [
      product.nomeProduto,
      product.nomeMarca,
      product.nomeResponsavel,
      product.dataValidade,
      product.quantidade.toString(),
      product.valor.toFixed(2),
      product.promocao ? "Sim" : "Não",
    ];
    tableRows.push(row);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("lista-produtos.pdf");
}
