import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { completarTarea, getTareas } from '../api/tareasApi';

export default function HomeScreen() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarTareas = async () => {
    try {
      const data = await getTareas();
      setTareas(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    } finally {
      setCargando(false);
    }
  };

  const marcarComoCompletada = async (id) => {
    const ok = await completarTarea(id);
    if (ok) {
      alert('Tarea marcada como completada');
      cargarTareas();
    } else {
      alert('No se pudo marcar como completada');
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  if (cargando) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18 }}>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: '#f5f5f5' }}>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              padding: 15,
              marginVertical: 6,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 1 },
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.titulo}</Text>
            <Text style={{ color: '#555', marginBottom: 6 }}>{item.descripcion}</Text>
            <Text style={{ color: item.estado ? 'green' : 'orange', fontWeight: 'bold' }}>
              {item.estado ? 'Completada' : 'Pendiente'}
            </Text>
            {!item.estado && (
              <TouchableOpacity
                onPress={() => marcarComoCompletada(item.id)}
                style={{
                  backgroundColor: '#007bff',
                  padding: 10,
                  borderRadius: 6,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center' }}>Marcar como completada</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#777', marginTop: 30 }}>
            No hay tareas para mostrar
          </Text>
        }
      />
    </View>
  );
}
