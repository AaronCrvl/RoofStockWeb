import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function exportTransactionToPdf(transaction) {
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

export function exportAllTransactionsToPdf(transactions) {
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
