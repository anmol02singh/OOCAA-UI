import React, { useEffect, useRef } from "react";
import {
  Viewer,
  Ion,
  Cartesian3,
  ClockRange,
  JulianDate,
  SampledPositionProperty,
  Color,
  LabelGraphics,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as satellite from "satellite.js";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Y2RiODRhNC04NGRmLTQ4ZDEtYjFkOS00YjAxY2FhMzc5YTEiLCJpZCI6MjU3NTY0LCJpYXQiOjE3MzI0MjU3MjF9.ymSENBanG_fmH5KF_c6zkmuQGIvGu0Ot09x73S6pobI";

interface CesiumViewerProps {
  tle1: { designator: string; tleLine1: string; tleLine2: string };
  tle2: { designator: string; tleLine1: string; tleLine2: string };
}

const CesiumViewer: React.FC<CesiumViewerProps> = ({ tle1, tle2 }) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  const computeOrbit = (tleLine1: string, tleLine2: string) => {
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    const positions = new SampledPositionProperty();

    const startTime = JulianDate.now();
    const endTime = JulianDate.addHours(startTime, 3, new JulianDate());

    const timeStepInSeconds = 60; // Update position every minute
    for (
      let time = startTime;
      JulianDate.lessThan(time, endTime);
      time = JulianDate.addSeconds(time, timeStepInSeconds, new JulianDate())
    ) {
      const jsDate = JulianDate.toDate(time);
      const positionAndVelocity = satellite.propagate(satrec, jsDate);
      const gmst = satellite.gstime(jsDate);

      // Ensure position is valid
      if (positionAndVelocity.position) {
        const positionEci = positionAndVelocity.position as satellite.EciVec3<number>;
        const positionEcf = satellite.eciToEcf(positionEci, gmst);

        // Compute longitude, latitude, and altitude
        const longitude = Math.atan2(positionEcf.y, positionEcf.x) * (180 / Math.PI); // Convert radians to degrees
        const latitude =
          Math.atan2(
            positionEcf.z,
            Math.sqrt(positionEcf.x * positionEcf.x + positionEcf.y * positionEcf.y)
          ) * (180 / Math.PI); // Convert radians to degrees
        const altitude = Math.sqrt(
          positionEcf.x * positionEcf.x +
            positionEcf.y * positionEcf.y +
            positionEcf.z * positionEcf.z
        ) - 6371; // Subtract Earth's radius (6371 km) for altitude in km

        // Validate calculated coordinates
        if (!isNaN(longitude) && !isNaN(latitude) && !isNaN(altitude)) {
          const cartesian = Cartesian3.fromDegrees(
            longitude,
            latitude,
            altitude * 1000 // Convert km to meters
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

        // Compute and add the orbits of both objects
        const orbit1 = computeOrbit(tle1.tleLine1, tle1.tleLine2);
        const orbit2 = computeOrbit(tle2.tleLine1, tle2.tleLine2);

        // Add orbit for object 1
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

        // Add orbit for object 2
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

        // Set viewer clock to match the orbital timeline
        viewer.clock.startTime = JulianDate.now();
        viewer.clock.stopTime = JulianDate.addHours(JulianDate.now(), 3, new JulianDate());
        viewer.clock.currentTime = JulianDate.now();
        viewer.clock.clockRange = ClockRange.LOOP_STOP;
        viewer.clock.multiplier = 60; // Fast forward 60x
      }
    } catch (error) {
      console.error("Error initializing Cesium Viewer:", error);
    }

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [tle1, tle2]);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
      }}
    ></div>
  );
};

export default CesiumViewer;
