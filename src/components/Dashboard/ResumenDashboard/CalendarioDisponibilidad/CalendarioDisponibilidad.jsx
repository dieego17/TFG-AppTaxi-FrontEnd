/* eslint-disable no-unused-vars */
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es"; 
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useFechaViaje } from "../../../../hooks/useFechaViaje";
import "./calendario.css";

// Configuro moment para usar el idioma español
moment.locale("es");

const localizer = momentLocalizer(moment);

function CalendarioDisponibilidad() {
  const token = localStorage.getItem("token");
  const idUsuario = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  const fechas = useFechaViaje(idUsuario);

  // Mapeo las fechas de viaje para mostrarlas en el calendario
  const eventos = fechas.map((fecha) => ({
    title: "Viaje",
    start: new Date(fecha.fecha_viaje),
    end: new Date(fecha.fecha_viaje),
  }));

  return (
    <div className="calendario__container">
      <h1>Calendario de Viajes </h1>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        selectable={false}
        messages={{
          today: "Hoy",
          previous: "Anterior",
          next: "Siguiente",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          allDay: "Todo el día",
          showMore: (total) => `+ Mostrar más (${total})`,
        }}
      />
    </div>
  );
}

export default CalendarioDisponibilidad;
