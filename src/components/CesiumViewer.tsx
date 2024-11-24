// import React, { useEffect, useRef } from "react";
// import { Viewer, Ion } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";

// Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Y2RiODRhNC04NGRmLTQ4ZDEtYjFkOS00YjAxY2FhMzc5YTEiLCJpZCI6MjU3NTY0LCJpYXQiOjE3MzI0MjU3MjF9.ymSENBanG_fmH5KF_c6zkmuQGIvGu0Ot09x73S6pobI';

// window.CESIUM_BASE_URL = "/Cesium";

// const CesiumViewer: React.FC = () => {
//   const viewerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let viewer: Viewer | undefined;
//     try {
//       if (viewerRef.current) {
//         viewer = new Viewer(viewerRef.current);
//       }
//     } catch (error) {
//       console.error("Error initializing Cesium Viewer:", error);
//     }
  
//     return () => {
//       if (viewer) {
//         viewer.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={viewerRef}
//       style={{
//         width: "100%",
//         height: "400px",
//         borderRadius: "8px",
//       }}
//     ></div>
//   );
// };

// export default CesiumViewer;

import React, { useEffect, useRef } from "react";
import { Viewer, Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Y2RiODRhNC04NGRmLTQ4ZDEtYjFkOS00YjAxY2FhMzc5YTEiLCJpZCI6MjU3NTY0LCJpYXQiOjE3MzI0MjU3MjF9.ymSENBanG_fmH5KF_c6zkmuQGIvGu0Ot09x73S6pobI";

const CesiumViewer: React.FC = () => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).CESIUM_BASE_URL = "/Cesium";

    let viewer: Viewer | undefined;
    try {
      if (viewerRef.current) {
        viewer = new Viewer(viewerRef.current);
      }
    } catch (error) {
      console.error("Error initializing Cesium Viewer:", error);
    }

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

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
