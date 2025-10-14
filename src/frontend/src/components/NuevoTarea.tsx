import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

// Solo los campos que necesita la API al crear una tarea
interface NuevaTareaDTO {
  titulo: string
  descripcion: string
  estado: boolean
}

const initialTarea: NuevaTareaDTO = {
  titulo: "",
  descripcion: "",
  estado: false
}

export function NuevoTarea() {
  const [tarea, setTarea] = useState<NuevaTareaDTO>(initialTarea)
  const navigate = useNavigate()

  const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    // Si es checkbox o booleano, usa checked, sino el value
    const newValue = type === "checkbox" ? checked : value

    setTarea({ ...tarea, [name]: newValue })
  }

  const guardar = async () => {
    console.log("Body enviado:", JSON.stringify(tarea))
    try {
      const response = await fetch(`${appsettings.apiUrl}Tareas/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tarea)
      })

      if (response.ok) {
        await Swal.fire({
          title: "¡Éxito!",
          text: "La tarea se creó correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar"
        })
        navigate("/")
      } else {
        const errorText = await response.text()
        await Swal.fire({
          title: "Error",
          text: errorText || "No se pudo guardar la tarea",
          icon: "error"
        })
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Error al conectar con el servidor",
        icon: "error"
      })
    }
  }

  const volver = () => {
    navigate("/")
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Nueva Tarea</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label>Título</Label>
              <Input
                type="text"
                name="titulo"
                onChange={inputChangeValue}
                value={tarea.titulo}
                placeholder="Título de la tarea"
              />
            </FormGroup>

            <FormGroup>
              <Label>Descripción</Label>
              <Input
                type="text"
                name="descripcion"
                onChange={inputChangeValue}
                value={tarea.descripcion}
                placeholder="Descripción de la tarea"
              />
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="estado"
                  onChange={inputChangeValue}
                  checked={tarea.estado}
                />{" "}
                Estado (marcado = completado)
              </Label>
            </FormGroup>
          </Form>

          <Button color="primary" className="me-4 mt-3" onClick={guardar}>
            Guardar
          </Button>
          <Button color="secondary" className="mt-3" onClick={volver}>
            Volver
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
