/* eslint-disable react-refresh/only-export-components */
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
import { useOneTaxista } from "../../../../hooks/useOneTaxista";
import logoVerde from "../../../../assets/images/logoVerde.png";

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
    width: 150,
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
    color: "red",
  },
});

function PDF({ datosFactura }) {

  const fecha = new Date();
  const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

  const fechaFormateadaViaje = (fecha) => {
    const date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const precio = parseFloat(datosFactura.precio);
  const IVA = (precio * 0.1).toFixed(1);
  const precioTotal = (precio + parseFloat(IVA)).toFixed(2);

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";
  const taxista = useOneTaxista(userId);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoText}>
              <Image
                style={styles.logo}
                src={logoVerde}
              />
            </View>
            <View>
              <Text>FACTURA</Text>
              <Text>Fecha: {fechaFormateada}</Text>
            </View>
          </View>

          {/* Emisor y Cliente */}
          <View style={styles.section}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={styles.title}>Taxista</Text>
                <Text style={styles.text}>
                  Nº de Licencia: {taxista.taxistum?.num_licencia}
                </Text>
                <Text style={styles.text}>Nombre: {taxista?.nombre} {taxista?.apellidos}</Text>
                <Text style={styles.text}>DNI: {taxista?.DNI}</Text>
                <Text style={styles.text}>Dirección: {taxista?.direccion_usuario}</Text>
                <Text style={styles.text}>Teléfono: {taxista?.telefono}</Text>
                <Text style={styles.text}>
                  Nº de cuenta: {taxista.taxistum?.numero_cuenta}
                </Text>
              </View>
              <View>
                <Text style={styles.title}>Cliente</Text>
                <Text style={styles.text}>Nombre: {datosFactura.nombreCliente} {datosFactura.apellidosCliente}</Text>
                <Text style={styles.text}>DNI: {datosFactura.dniCliente}</Text>
                <Text style={styles.text}>Dirección: {datosFactura.direccionCliente}</Text>
                <Text style={styles.text}>Teléfono: {datosFactura.telefonoCliente}</Text>
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
                  <Text style={styles.textImporteCant}>
                    Viaje de {datosFactura.origenViaje} a {datosFactura.destinoViaje}, el día {fechaFormateadaViaje(datosFactura.fechaViaje)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.textImporteCant}>{precio.toFixed(2)}€</Text>
                </View>
              </View>
              {/* Resumen */}
              <View style={styles.tableRow}>
                <View style={styles.tableColResumen}></View>
                <View style={styles.tableColResumen}></View>
                <View style={styles.tableColResumen}>
                  <View style={styles.summaryRow}>
                    <Text>BASE IMPONIBLE:</Text>
                    <Text>{precio.toFixed(2)}€</Text>
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
          <View style={styles.section}></View>

          {/* Cobros y vencimientos */}
          <View style={styles.section}>
            <View style={styles.correo}>
              <Text>{taxista?.correo_electronico}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDF;
