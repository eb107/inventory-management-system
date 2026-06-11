import * as XLSX from "xlsx";

// data -> array de objetos que virá do inventário
// fileName -> nome do arquivo que será baixado
export function exportToExcel(data, fileName) {
  // converte o array de objetos em uma planilha, cada chave do objeto vira uma coluna, cada item do array vira uma linha
  const worksheet = XLSX.utils.json_to_sheet(data);

  // cria um arquivo Excel vazio, um workbook pode ter várias abas (worksheets)
  const workbook = XLSX.utils.book_new();

  // adiciona a planilha ao arquivo, Inventário é o nome da aba
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventário");

  // gera o arquivo e dispara o download no navegador, o nome do arquivo será fileName + .xlsx
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export function exportInventoryToExcel(inventoryItems) {

    // percorre cada item do invetário e transforma em um objeto formatado
    const formattedData = inventoryItems.map((item) => ({
        Nome: item.name,
        Categoria: item.category,
        Quantidade: item.quantity,
    }));


    // passa os dados formatados e o nome do arquivo
    exportToExcel(formattedData, "relatório-inventario-uso");
}

export function exportObsoleteInventoryToExcel(inventoryItems) {

    // percorre cada item do invetário e transforma em um objeto formatado
    const formattedData = inventoryItems.map((item) => ({
        Nome: item.name,
        Categoria: item.category,
        Quantidade: item.quantity,
    }));


    // passa os dados formatados e o nome do arquivo
    exportToExcel(formattedData, "relatório-inventario-desuso");
}
