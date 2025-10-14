import { useEffect, useState } from "react";
import { appsettings } from "../settings/appsettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IETareas } from "../Interfaces/IETareas";
import { Container, Row, Col, Table, Button } from "reactstrap";

export function Lista() {
  const [tarea, setTareas] = useState<IETareas[]>([]);

  const obtenerTareas = async () => {
    const response = await fetch(`${appsettings.apiUrl}Tareas`);
    if (response.ok) {
      const data = await response.json();
      console.log("Datos recibidos desde la API:", data);
      setTareas(data);
    } else {
      console.log("Error al obtener tareas:", response.status);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const MarcarComoCompletada = async (id: number) => {
    const response = await fetch(`${appsettings.apiUrl}Tareas/${id}/completar`, {
      method: "PUT",
    });

    if (response.ok) {
      Swal.fire("Éxito", "La tarea fue marcada como completada.", "success");
      await obtenerTareas();
    } else {
      Swal.fire("Error", "No se pudo marcar como completada.", "error");
    }
  };

  const obtenerTareasFiltradas = async (estado: boolean) => {
    const response = await fetch(`${appsettings.apiUrl}Tareas/filtrar?estado=${estado}`);
    if (response.ok) {
      const data = await response.json();
      setTareas(data);
    } else {
      Swal.fire("Error", "No se pudieron obtener las tareas filtradas.", "error");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Lista de tareas</h4>
          <hr />
          <div className="d-flex gap-2 mb-3">
            <Link className="btn btn-success" to="/nuevotarea">
              Nueva Tarea
            </Link>
            <Button color="secondary" onClick={() => obtenerTareasFiltradas(true)}>
              Mostrar Completadas
            </Button>
            <Button color="dark" onClick={() => obtenerTareasFiltradas(false)}>
              Mostrar Pendientes
            </Button>
          </div>

          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {tarea.map((item) => (
                <tr key={item.id}>
                  <td>{item.titulo}</td>
                  <td>{item.descripcion}</td>
                  <td
                    style={{
                      color: item.estado ? "green" : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {item.estado ? "Completada" : "Pendiente"}
                  </td>
                  <td>{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">
                    {!item.estado ? (
                      <div className="form-check form-switch d-flex align-items-center justify-content-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`check-${item.id}`}
                          onChange={() => MarcarComoCompletada(item.id!)}
                        />
                        <label
                          className="form-check-label ms-2 text-secondary"
                          htmlFor={`check-${item.id}`}
                        >
                          Marcar completada
                        </label>
                      </div>
                    ) : (
                      <span className="text-success fw-bold">✔</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
