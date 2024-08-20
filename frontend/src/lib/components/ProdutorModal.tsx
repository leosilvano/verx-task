import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {Cultura, Produtor} from "@/lib/types/produtor";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {IMaskInput} from "react-imask";

type Props = {
    produtor: Produtor;
    show: boolean;
    onHide: () => void
}

export function ProdutorModal({produtor, show, onHide}: Props) {
    const queryClient = useQueryClient();

    const [object, setObject] = useState<Produtor>(produtor);
    const [errors, setErrors] = useState<{}>({});
    const mutation = useMutation({
        mutationFn: (object: Produtor) => {
            if (object.id) {
                return axios.patch(`http://localhost:8000/produtor/api/${object.id}/`, object)
            } else {
                return axios.post('http://localhost:8000/produtor/api/', object)
            }
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({queryKey: ['dashboard']});
            queryClient.setQueriesData({queryKey: ['produtor']}, (previous: any) => {
                return previous.map((produtor: Produtor) => (produtor.id === res.data.id ? res.data : produtor))
            })
            onHide();
        },
        onError: (error: any) => {
            setErrors(error.response.data);
        },
    })

    const getErrors = (name: string) => {
        if (!!errors && errors.hasOwnProperty(name)) {
            // @ts-ignore
            return errors[name];
        }

        return null
    }

    const handleSubmit = (event: any) => {
        if (event) {
            event.preventDefault();
        }

        mutation.mutate(object);
    }

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setObject(object => ({
            ...object,
            [name]: value
        }));
    }

    const handleChangeCulturas = (event: any) => {
        const {name, value} = event.target;

        setObject(object => ({
            ...object,
            [name]: value.split(',').map((e: string) => {
                return {"nome": e};
            })
        }));
    }

    const formatCulturas = (object: Produtor) => {
        return object.culturas.map((e: Cultura) => {
            return e.nome
        }).join(',')
    }

    const getCPFCNPJMask = (object: Produtor) => {
        if(object.tipo_documento == "CPF"){
            return "000.000.000-00"
        }

        return "00.000.000/0000-00"
    }

    useEffect(() => {
        setObject(produtor);
    }, [produtor])

    return (
        <Modal show={show} size="lg">
            <Modal.Header closeButton={!mutation.isPending} onHide={onHide}>
                {produtor.hasOwnProperty("id") ? "Editar produtor" : "Novo Produtor"}
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label>Nome do produtor</Form.Label>
                            <Form.Control type="text" name="nome_produtor"
                                          value={object.nome_produtor}
                                          onChange={handleChange}
                                          className={getErrors("nome_produtor") ? "is-invalid" : ""}/>
                            {getErrors("nome_produtor") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("nome_produtor")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label>Nome da fazenda</Form.Label>
                            <Form.Control type="text" name="nome_fazenda"
                                          value={object.nome_fazenda}
                                          onChange={handleChange}
                                          className={getErrors("nome_fazenda") ? "is-invalid" : ""}/>
                            {getErrors("nome_fazenda") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("nome_fazenda")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label>Tipo de documento</Form.Label>
                            <Form.Select name="tipo_documento"
                                         className={getErrors("tipo_documento") ? "is-invalid" : ""}
                                         onChange={handleChange} value={object.tipo_documento}>
                                <option value="CPF">CPF</option>
                                <option value="CNPJ">CNPF</option>
                            </Form.Select>
                            {getErrors("tipo_documento") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("tipo_documento")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label>{object.tipo_documento}</Form.Label>
                            <Form.Control type="text" name="cpf_cnpj"
                                          value={object.cpf_cnpj}
                                          as={IMaskInput}
                                          mask={getCPFCNPJMask(object)}
                                          onChange={handleChange}
                                          className={getErrors("cpf_cnpj") ? "is-invalid" : ""}/>
                            {getErrors("cpf_cnpj") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("cpf_cnpj")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control type="text" name="cidade"
                                          value={object.cidade}
                                          onChange={handleChange}
                                          className={getErrors("cidade") ? "is-invalid" : ""}/>
                            {getErrors("cidade") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("cidade")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control type="text" name="estado"
                                          value={object.estado}
                                          onChange={handleChange}
                                          className={getErrors("estado") ? "is-invalid" : ""}/>
                            {getErrors("estado") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("estado")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Área Total</Form.Label>
                            <Form.Control type="text" name="area_total"
                                          value={object.area_total}
                                          onChange={handleChange}
                                          className={getErrors("area_total") ? "is-invalid" : ""}/>
                            {getErrors("area_total") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("area_total")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Área Agricultável</Form.Label>
                            <Form.Control type="number" min="0" name="area_agricultavel"
                                          value={object.area_agricultavel}
                                          onChange={handleChange}
                                          className={getErrors("area_agricultavel") ? "is-invalid" : ""}/>
                            {getErrors("area_agricultavel") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("area_agricultavel")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Área de Vegetação</Form.Label>
                            <Form.Control type="number" min="0" name="area_vegetacao"
                                          value={object.area_vegetacao}
                                          onChange={handleChange}
                                          className={getErrors("area_vegetacao") ? "is-invalid" : ""}/>
                            {getErrors("area_vegetacao") && (
                                <Form.Control.Feedback type="invalid">
                                    {getErrors("area_vegetacao")}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="12" className="mb-3">
                            <Form.Label>Culturas</Form.Label>
                            <Form.Control type="text" name="culturas"
                                          value={formatCulturas(object)}
                                          onChange={handleChangeCulturas}/>
                            <Form.Text className="text-muted">
                                Adicione culturas separadas por ,
                            </Form.Text>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-flex flex-row-reverse g3">
                                <Button variant="primary" type="submit" disabled={mutation.isPending}>Enviar</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}