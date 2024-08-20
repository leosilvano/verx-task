import {useDashboard} from "@/lib/Hooks/useDashboard";
import {Loader} from "@/lib/components/Loader";
import {Chart} from "react-google-charts";
import {Alert, Card, Col, Row} from "react-bootstrap";

export function Dashboard() {

    const dashboard = useDashboard();

    if (dashboard.isFetching) {
        return <Loader/>
    }

    if (dashboard.error) {
        return (
            <Alert variant="danger">
                Erro ao tentar carregar dados do Dashboard.
            </Alert>
        )
    }

    let total_fazendas = 0;
    if (dashboard.data.total_por_estado) {
        total_fazendas = dashboard.data.total_fazendas;
    }

    let total_hectares = 0;
    if (dashboard.data.total_por_area) {
        total_hectares = dashboard.data.total_por_area.total_area_agricultavel + dashboard.data.total_por_area.total_area_vegetacao;
        if (Number.isNaN(total_hectares)) {
            total_hectares = 0
        } else {
            total_hectares = total_hectares / 10000;
        }
    }

    let total_por_estado = [];
    if (dashboard.data.total_por_estado) {
        total_por_estado.push(["Estado", "Total"]);
        dashboard.data.total_por_estado.forEach((e: any) => {
            total_por_estado.push([e.nome, e.total])
        })
    }

    let total_por_cultura = [];
    if (dashboard.data.total_por_cultura) {
        total_por_cultura.push(["Cultura", "Total"]);
        dashboard.data.total_por_cultura.forEach((e: any) => {
            total_por_cultura.push([e.nome, e.total])
        })
    }


    let total_por_area = []
    if (dashboard.data.total_por_area) {
        total_por_area.push(["Area", "Total"]);
        if (dashboard.data.total_por_area.total_area_agricultavel) {
            total_por_area.push(["Área Agricultável", dashboard.data.total_por_area.total_area_agricultavel]);
        }
        if (dashboard.data.total_por_area.total_area_vegetacao) {
            total_por_area.push(["Área de Vegetação", dashboard.data.total_por_area.total_area_vegetacao]);
        }
    }

    return (
        <>
            <Row className="g-3">
                <Col lg={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>
                                Total de fazendas
                            </Card.Title>
                            <Card.Text>
                                <i className="bi bi-house h1"></i>
                            </Card.Text>
                            <Card.Text>
                                <span className="h2">{total_fazendas}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>
                                Total de hectares
                            </Card.Title>
                            <Card.Text>
                                <i className="bi bi-house h1"></i>
                            </Card.Text>
                            <Card.Text>
                                <span className="h2">{total_hectares.toFixed(2)}</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={12}>
                    <Card className="text-center">
                        <Card.Body>
                            <Chart
                                className="rounded-lg"
                                chartType="PieChart"
                                data={total_por_estado}
                                options={{
                                    title: "Total de fazendas por estado"
                                }}
                                width={"100%"}
                                height={"400px"}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Chart
                                className="rounded-lg"
                                chartType="PieChart"
                                data={total_por_cultura}
                                options={{
                                    title: "Total de fazendas por estado"
                                }}
                                width={"100%"}
                                height={"400px"}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Chart
                                className="rounded-lg"
                                chartType="PieChart"
                                data={total_por_area}
                                options={{
                                    title: "Uso por solo"
                                }}
                                width={"100%"}
                                height={"400px"}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}