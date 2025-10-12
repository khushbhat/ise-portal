import * as XLSX from 'xlsx';

interface Publication {
  id: number;
  title: string;
  author: string;
  publication: string;
  year: number;
  reference?: string;
  description?: string;
}

export const exportPublicationsToExcel = (publications: Publication[], filename: string = 'publications.xlsx') => {
  const data = publications.map(pub => ({
    'Year': pub.year,
    'Title': pub.title,
    'Authors': pub.author,
    'Publication/Journal': pub.publication,
    'Reference': pub.reference || '',
    'Description': pub.description || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Publications');

  worksheet['!cols'] = [
    { wch: 8 },
    { wch: 60 },
    { wch: 30 },
    { wch: 40 },
    { wch: 30 },
    { wch: 50 }
  ];

  XLSX.writeFile(workbook, filename);
};
