/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderColor: '#CCC',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
  },
});

function Pdf({ clientes }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Factura</Text>
        </View>
        {clientes.map((cliente, index) => (
            console.log(cliente),
          <View style={styles.section} key={index}>
            <Text style={styles.sectionTitle}>Detalles del cliente:</Text>
            <Text style={styles.text}>Nombre: {cliente.nombre}</Text>
            <Text style={styles.text}>Dirección: {cliente.direccion_cliente}</Text>
            <Text style={styles.text}>Teléfono: {cliente.telefono}</Text>

            <Text style={styles.sectionTitle}>Reservas:</Text>
            {cliente.reservas.map((reserva, idx) => (
                console.log(reserva),
              <View key={idx}>
                <Text style={styles.text}>Fecha de reserva: {reserva.fecha_reserva}</Text>
              </View>

                

            ))}
          </View>
        ))}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de la factura:</Text>
          <Text style={styles.text}>Número de factura: 1</Text>
          <Text style={styles.text}>Fecha: 17 de abril de 2002</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos:</Text>
          <View>
            <Text style={styles.text}>Viaje a Madrid: 30€</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total:</Text>
          <Text style={styles.text}>32€</Text>
        </View>
      </Page>
    </Document>
  );
}

export default Pdf;
