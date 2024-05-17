/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../assets//images/logo.png';

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '1px solid #000',
  },
  logo: {
    width: 100,
  },
  logoText:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  text: {
    marginBottom: 2,
  },
  textImporteCant:{
    textAlign: 'center'
  },
  textTitle:{
    textAlign: 'center'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  tableColTitle:{
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#006431',
    padding: 5,
    color: '#fff',
  },
  tableColResumen:{
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 5,
    paddingTop: 200,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  correo: {
    borderTop: '1px solid #000',
    paddingTop: 10,
    textAlign: 'center',
  },
  importeTotal:{
    fontWeight: 'bold'
  }
  
});


function Pdf({ clientes }) {

  const fecha = new Date();
  const fechaFormateada = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {clientes.map((cliente) => (
          console.log(cliente),
          <View key={cliente.id_usuario}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoText}>
                <Image style={styles.logo} src={logo} />
                <Text>App Taxio</Text>
              </View>
              <View>
                <Text>FACTURA</Text>
                <Text>Nº de factura: 1</Text>
                <Text>Fecha: {fechaFormateada}</Text>
              </View>
            </View>

            {/* Emisor y Cliente */}
            <View style={styles.section}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.title}>Emisor</Text>
                  <Text style={styles.text}>Nº de Licencia: 00000000A</Text>
                  <Text style={styles.text}>Encarna Vales García</Text>
                  <Text style={styles.text}>DNI: 17000000A</Text>
                  <Text style={styles.text}>Dirección: Calle Río de Janeiro</Text>
                  <Text style={styles.text}>Código Postal: 50000</Text>
                  <Text style={styles.text}>Zaragoza (España)</Text>
                  <Text style={styles.text}>Nº de cuenta: ES00 0000 0000 0000 0000 0000</Text>
                </View>
                <View>
                  <Text style={styles.title}>Cliente</Text>
                  <Text style={styles.text}>A08479297</Text>
                  <Text style={styles.text}>Dirección: {cliente.direccion_cliente}</Text>
                  <Text style={styles.text}>08021 - Barcelona</Text>
                  <Text style={styles.text}>Barcelona (España)</Text>
                </View>
              </View>
            </View>

            {/* Detalles de la factura */}
            <View style={styles.section}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.textTitle}>CANTIDAD</Text>
                  </View>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.textTitle}>CONCEPTO</Text>
                  </View>
                  <View style={styles.tableColTitle}>
                    <Text style={styles.textTitle}>IMPORTE</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.textImporteCant}>1</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.textImporteCant}>Viaje de Madrid a Lisboa</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.textImporteCant}>575,00€</Text>
                  </View>
                </View>
                {/* Resumen */}
                <View style={styles.tableRow}>
                  <View style={styles.tableColResumen}>
                    {/* <Text>Resumen</Text> */}
                  </View>
                  <View style={styles.tableColResumen}></View>
                  <View style={styles.tableColResumen}>
                    <View style={styles.summaryRow}>
                      <Text>BASE IMPONIBLE:</Text>
                      <Text>575,00€</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text>IVA 10%:</Text>
                      <Text>57,5€</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text>TOTAL EUROS:</Text>
                      <Text style={styles.importeTotal}>632,5€</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Cobros y vencimientos */}
            <View style={styles.section}>
              <View style={styles.correo}>
                <Text style={styles.correoText}>diego@correo.es</Text>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}


export default Pdf;
