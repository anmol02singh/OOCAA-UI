import React, { useEffect, useRef } from "react";
import {
  Viewer,
  Ion,
  Cartesian3,
  ClockRange,
  JulianDate,
  SampledPositionProperty,
  Color,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as satellite from "satellite.js";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Y2RiODRhNC04NGRmLTQ4ZDEtYjFkOS00YjAxY2FhMzc5YTEiLCJpZCI6MjU3NTY0LCJpYXQiOjE3MzI0MjU3MjF9.ymSENBanG_fmH5KF_c6zkmuQGIvGu0Ot09x73S6pobI";

interface CesiumViewerProps {
  tle1: { designator: string; tleLine1: string; tleLine2: string };
  tle2: { designator: string; tleLine1: string; tleLine2: string };
  tca: string;
}

const CesiumViewer: React.FC<CesiumViewerProps> = ({ tle1, tle2, tca }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const computeOrbit = (
    tleLine1: string,
    tleLine2: string,
    startTime: JulianDate,
    endTime: JulianDate
  ) => {
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    const positions = new SampledPositionProperty();

    const timeStepInSeconds = 60;
    for (
      let time = startTime;
      JulianDate.lessThan(time, endTime);
      time = JulianDate.addSeconds(time, timeStepInSeconds, new JulianDate())
    ) {
      const jsDate = JulianDate.toDate(time);
      const positionAndVelocity = satellite.propagate(satrec, jsDate);
      const gmst = satellite.gstime(jsDate);

      if (positionAndVelocity.position) {
        const positionEci = positionAndVelocity.position as satellite.EciVec3<number>;
        const positionEcf = satellite.eciToEcf(positionEci, gmst);

        const longitude = Math.atan2(positionEcf.y, positionEcf.x) * (180 / Math.PI);
        const latitude =
          Math.atan2(
            positionEcf.z,
            Math.sqrt(positionEcf.x * positionEcf.x + positionEcf.y * positionEcf.y)
          ) * (180 / Math.PI);
        const altitude = Math.sqrt(
          positionEcf.x * positionEcf.x +
            positionEcf.y * positionEcf.y +
            positionEcf.z * positionEcf.z
        ) - 6371;

        if (!isNaN(longitude) && !isNaN(latitude) && !isNaN(altitude)) {
          const cartesian = Cartesian3.fromDegrees(
            longitude,
            latitude,
            altitude * 1000 
          );
          positions.addSample(time, cartesian);
        }
      }
    }

    return positions;
  };

  useEffect(() => {
    (window as any).CESIUM_BASE_URL = "/Cesium";

    let viewer: Viewer | undefined;
    try {
      if (viewerRef.current) {
        viewer = new Viewer(viewerRef.current);

        const tcaDate = new Date(tca);
        const tcaJulian = JulianDate.fromDate(tcaDate);

        const startTime = tcaJulian;
        const endTime = JulianDate.addHours(tcaJulian, 3, new JulianDate());

        const orbit1 = computeOrbit(tle1.tleLine1, tle1.tleLine2, startTime, endTime);
        const orbit2 = computeOrbit(tle2.tleLine1, tle2.tleLine2, startTime, endTime);

        viewer.entities.add({
          id: tle1.designator,
          name: tle1.designator,
          position: orbit1,
          point: {
            pixelSize: 10,
            color: Color.BLUE,
          },
          path: {
            resolution: 120,
            material: Color.BLUE.withAlpha(0.6),
            width: 2,
          },
          label: {
            text: tle1.designator,
            font: "14pt sans-serif",
            fillColor: Color.BLUE,
            outlineColor: Color.WHITE,
            outlineWidth: 2,
            showBackground: true,
          },
        });

        viewer.entities.add({
          id: tle2.designator,
          name: tle2.designator,
          position: orbit2,
          point: {
            pixelSize: 10,
            color: Color.RED,
          },
          path: {
            resolution: 120,
            material: Color.RED.withAlpha(0.6),
            width: 2,
          },
          label: {
            text: tle2.designator,
            font: "14pt sans-serif",
            fillColor: Color.RED,
            outlineColor: Color.WHITE,
            outlineWidth: 2,
            showBackground: true,
          },
        });

        viewer.clock.startTime = startTime;
        viewer.clock.stopTime = endTime;
        viewer.clock.currentTime = startTime;
        viewer.clock.clockRange = ClockRange.LOOP_STOP;
        viewer.clock.multiplier = 60;

        viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime);
      }
    } catch (error) {
      console.error("Error initializing Cesium Viewer:", error);
    }

    const handleResize = () => {
      if (viewer) {
        viewer.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [tle1, tle2, tca]);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "100%",
        minWidth: "500px",
        height: "400px",
        borderRadius: "8px",
      }}
    ></div>
  );
};

export default CesiumViewer;

