/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/images/logo.png";
import { useOneViajeCliente } from "../../hooks/useOneViajeCliente";

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: "1px solid #000",
  },
  logo: {
    width: 100
  },
  logoText: {
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  text: {
    marginBottom: 2,
  },
  textImporteCant: {
    textAlign: "center",
  },
  textTitle: {
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  tableColTitle: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#006431",
    padding: 5,
    color: "#fff",
  },
  tableColResumen: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 5,
    paddingTop: 200,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  correo: {
    borderTop: "1px solid #000",
    paddingTop: 10,
    textAlign: "center",
  },
  importeTotal: {
    fontWeight: "bold",
  },
});

function Pdf({ viaje }) {
  const fecha = new Date();
  const fechaFormateada = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

  const fechaFormateadaViaje = (fecha) => {
    const date = new Date(fecha);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  };

  const IVA = (viaje.precioTotal_viaje * 0.1).toFixed(1);
  const precioTotal = parseFloat(IVA) + viaje.precioTotal_viaje;


  const id_viaje = viaje.id_viaje;

  // Hook para obtener los clientes de un viaje
  const clientes = useOneViajeCliente(id_viaje);

  


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoText}>
              <Image style={styles.logo} src={logo} />
              <Text>App Taxio</Text>
            </View>
            <View>
              <Text>FACTURA</Text>
              <Text>Fecha: {fechaFormateada}</Text>
            </View>
          </View>

          {/* Emisor y Cliente */}
          <View style={styles.section}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={styles.title}>Taxista</Text>
                <Text style={styles.text}>
                  Nº de Licencia: {viaje.taxistum.num_licencia}
                </Text>
                <Text style={styles.text}>Nombre: {viaje.taxistum.usuario.nombre} {viaje.taxistum.usuario.apellidos}</Text>
                <Text style={styles.text}>DNI: {viaje.taxistum.usuario.DNI}</Text>
                <Text style={styles.text}>Dirección: {viaje.taxistum.usuario.direccion_usuario}</Text>
                <Text style={styles.text}>
                  Nº de cuenta: {viaje.taxistum.numero_cuenta}
                </Text>
              </View>
              {
                clientes.reserva &&
                  <View key={clientes.reserva.cliente.id_usuario}>
                    <Text style={styles.title}>Cliente</Text>
                    <Text style={styles.text}>Nombre: {clientes.reserva.cliente.usuario.nombre} {clientes.reserva.cliente.usuario.apellidos}</Text>
                    <Text style={styles.text}>DNI: A08479297</Text>
                    <Text style={styles.text}>Dirección: {clientes.reserva.cliente.usuario.direccion_usuario}</Text>
                    <Text style={styles.text}>Teléfono: {clientes.reserva.cliente.usuario.telefono}</Text>
                  </View>
                
              }
              
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
                  <Text style={styles.textImporteCant}>
                    Viaje de {viaje.origen_viaje} a {viaje.destino_viaje}, el día {fechaFormateadaViaje(viaje.fecha_viaje)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.textImporteCant}>
                    {viaje.precioTotal_viaje}€
                  </Text>
                </View>
              </View>
              {/* Resumen */}
              <View style={styles.tableRow}>
                <View style={styles.tableColResumen}>
                </View>
                <View style={styles.tableColResumen}></View>
                <View style={styles.tableColResumen}>
                  <View style={styles.summaryRow}>
                    <Text>BASE IMPONIBLE:</Text>
                    <Text>{viaje.precioTotal_viaje}€</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text>IVA 10%:</Text>
                    <Text>{IVA}€</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text>TOTAL EUROS:</Text>
                    <Text style={styles.importeTotal}>{precioTotal}€</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Sello de la factura */}
          <View style={styles.section}>
            
          </View>

          {/* Cobros y vencimientos */}
          <View style={styles.section}>
            <View style={styles.correo}>
              <Text style={styles.correoText}>{viaje.taxistum.usuario.correo_electronico}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default Pdf;
