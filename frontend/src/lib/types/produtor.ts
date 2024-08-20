export type Cultura = {
    nome: string
}

export type Produtor = {
    id?: number;
    cpf_cnpj: string;
    tipo_documento: string;
    nome_produtor: string;
    nome_fazenda: string;
    cidade: string;
    estado: string;
    area_total: number;
    area_agricultavel: number;
    area_vegetacao: number;
    culturas: Cultura[];
}
