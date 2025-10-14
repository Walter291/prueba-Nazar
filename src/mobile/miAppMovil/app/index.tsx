import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { completarTarea, getTareas, getTareasFiltradas } from '../api/tareasApi';

export default function HomeScreen({ navigation }) {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState(null);

  const cargarTareas = async () => {
    try {
      setCargando(true);
      const data = filtro === null ? await getTareas() : await getTareasFiltradas(filtro);
      setTareas(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    } finally {
      setCargando(false);
    }
  };

  const marcarComoCompletada = async (id) => {
    const ok = await completarTarea(id);
    Alert.alert(ok ? 'Éxito' : 'Error', ok ? 'Tarea marcada como completada' : 'No se pudo marcar como completada');
    cargarTareas();
  };

  useEffect(() => {
    cargarTareas();
  }, [filtro]);

  const getBotonStyle = (valorFiltro) => ({
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor:
      filtro === valorFiltro
        ? valorFiltro === null
          ? '#4dabf7'
          : valorFiltro
          ? '#69db7c'
          : '#f5a623'
        : '#ddd',
  });

  const getBotonTextStyle = (valorFiltro) => ({
    color: filtro === valorFiltro ? '#fff' : '#333',
    textAlign: 'center',
    fontWeight: '600',
  });

  if (cargando) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18 }}>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: '#f5f5f5' }}>
      {/* Botones */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            marginHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 8,
            backgroundColor: '#4b7bec',
          }}
          onPress={() => navigation.navigate('NuevaTarea')}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '600' }}>Nueva Tarea</Text>
        </TouchableOpacity>

        <TouchableOpacity style={getBotonStyle(null)} onPress={() => setFiltro(null)}>
          <Text style={getBotonTextStyle(null)}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getBotonStyle(true)} onPress={() => setFiltro(true)}>
          <Text style={getBotonTextStyle(true)}>Completadas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getBotonStyle(false)} onPress={() => setFiltro(false)}>
          <Text style={getBotonTextStyle(false)}>Pendientes</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tareas */}
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
              shadowOpacity: 0.05,
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
          <Text style={{ textAlign: 'center', color: '#777', marginTop: 30 }}>No hay tareas para mostrar</Text>
        }
      />
    </View>
  );
}
