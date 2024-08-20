import {Loader} from "@/lib/components/Loader";
import {Cultura, Produtor} from "@/lib/types/produtor";
import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import {useProdutores} from "@/lib/Hooks/useProdutor";
import {ProdutorModal} from "@/lib/components/ProdutorModal";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

function defaultProdutor(): Produtor {
    return {
        cpf_cnpj: "",
        tipo_documento: "CNPJ",
        nome_produtor: "",
        nome_fazenda: "",
        cidade: "",
        estado: "",
        area_total: 0,
        area_agricultavel: 0,
        area_vegetacao: 0,
        culturas: []
    }
}

export function ProdutorList() {
    const queryClient = useQueryClient();

    const produtores = useProdutores();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedProdutor, setSelectedProdutor] = useState<Produtor>(defaultProdutor());

    const mutation = useMutation({
        mutationFn: (object: Produtor) => {
            return axios.delete(`http://localhost:8000/produtor/api/${object.id}/`)
        },
        onSuccess: (res: any, object: Produtor) => {
            queryClient.invalidateQueries({queryKey: ['dashboard']});
            queryClient.setQueriesData({queryKey: ['produtor']}, (previous: any) => {
                return previous.filter((produtor: Produtor) => (produtor.id !== object.id))
            })
        },
    })

    if (produtores.isFetching) {
        return <Loader/>
    }

    const onCreate = () => {
        setSelectedProdutor(defaultProdutor())
        setShowModal(true)
    }

    return (
        <>
            <Row className="mb-3">
                <Col lg={12}>
                    <Button onClick={onCreate}>
                        Novo produtor
                    </Button>
                </Col>
            </Row>
            <Table striped bordered responsive hover>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Fazenda</th>
                    <th>CPF/CNPJ</th>
                    <th>Local</th>
                    <th>Área Total</th>
                    <th>Área Agricultável</th>
                    <th>Área de Vegetação</th>
                    <th>Culturas</th>
                    <td></td>
                </tr>
                </thead>
                <tbody style={{'overflowY': 'auto'}}>
                {produtores.data.map((produtor: Produtor) => {
                    const formatCulturas = (object: Produtor) => {
                        return object.culturas.map((e: Cultura) => {
                            return e.nome
                        }).join(', ')
                    }

                    const formatCPFCNPJ = (object: Produtor) => {
                        if (object.tipo_documento == "CPF") {
                            return object.cpf_cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
                        }

                        return object.cpf_cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
                    }

                    const onEdit = () => {
                        setSelectedProdutor(produtor)
                        setShowModal(true)
                    }

                    const onRemove = () => {
                        if (confirm('Tem certeza que deseja remover esse produtor?')) {
                            mutation.mutate(produtor)
                        }
                    }

                    return (
                        <tr key={produtor.id}>
                            <td className="align-middle">{produtor.nome_produtor}</td>
                            <td className="align-middle">{produtor.nome_fazenda}</td>
                            <td className="align-middle">{formatCPFCNPJ(produtor)}</td>
                            <td className="align-middle">{produtor.cidade} - {produtor.estado}</td>
                            <td className="align-middle">{produtor.area_total} m2</td>
                            <td className="align-middle">{produtor.area_agricultavel} m2</td>
                            <td className="align-middle">{produtor.area_vegetacao} m2</td>
                            <td className="align-middle">{formatCulturas(produtor)}</td>
                            <td className="text-center align-middle g-3" width="120px">
                                <Button className="m-1" variant="primary" size="sm" onClick={onEdit}>
                                    <i className="bi bi-pencil"/>
                                </Button>
                                <Button className="m-1" variant="danger" size="sm" onClick={onRemove}>
                                    <i className="bi bi-trash"/>
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <ProdutorModal produtor={selectedProdutor} show={showModal} onHide={() => setShowModal(false)}/>
        </>
    )
}