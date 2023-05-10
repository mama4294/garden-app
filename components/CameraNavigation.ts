export function screenToCanvas(point: Point, camera: Camera): Point {
  return {
    x: point.x / camera.z - camera.x,
    y: point.y / camera.z - camera.y,
  };
}

export function canvasToScreen(point: Point, camera: Camera): Point {
  return {
    x: (point.x - camera.x) * camera.z,
    y: (point.y - camera.y) * camera.z,
  };
}

export function getViewport(camera: Camera, viewport: Viewport): Viewport {
  const topLeft = screenToCanvas(
    { x: viewport.minX, y: viewport.minY },
    camera
  );
  const bottomRight = screenToCanvas(
    { x: viewport.maxX, y: viewport.maxY },
    camera
  );

  return {
    minX: topLeft.x,
    minY: topLeft.y,
    maxX: bottomRight.x,
    maxY: bottomRight.y,
    height: bottomRight.x - topLeft.x,
    width: bottomRight.y - topLeft.y,
  };
}

export function getInitialViewport(viewport: Viewport): Viewport {
  const topLeft = { x: viewport.minX, y: viewport.minY };
  const bottomRight = { x: viewport.maxX, y: viewport.maxY };

  return {
    minX: topLeft.x,
    minY: topLeft.y,
    maxX: bottomRight.x,
    maxY: bottomRight.y,
    height: bottomRight.x - topLeft.x,
    width: bottomRight.y - topLeft.y,
  };
}

export const centerInViewport = (
  centerPoint: Point,
  planterWidth: number,
  planterHeight: number,
  viewport: Viewport,
  camera: Camera
): Camera => {
  const currentZoomX = viewport.width / planterWidth;
  const currentZoomY = viewport.height / planterHeight;
  const minCurrentZoom = Math.min(currentZoomX, currentZoomY);
  const requiredZoom = (minCurrentZoom / 1.4) * camera.z;
  return zoomTo(
    { x: centerPoint.x, y: centerPoint.y, z: camera.z },
    requiredZoom
  );
};

export const getInitialFittedCamera = (
  viewport: Viewport,
  planterWidth: number,
  planterHeight: number
): Camera => {
  const topLeft = { x: viewport.minX, y: viewport.minY };
  const bottomRight = { x: viewport.maxX, y: viewport.maxY };

  const currentViewport = {
    minX: topLeft.x,
    minY: topLeft.y,
    maxX: bottomRight.x,
    maxY: bottomRight.y,
    height: bottomRight.x - topLeft.x,
    width: bottomRight.y - topLeft.y,
  };

  const centerPoint = {
    x: currentViewport.height / 2 - planterWidth / 2,
    y: currentViewport.width / 2 - planterHeight / 2,
  };

  return centerInViewport(
    centerPoint,
    planterWidth,
    planterHeight,
    currentViewport,
    { x: 0, y: 0, z: 1 }
  );
};

export function panCamera(camera: Camera, dx: number, dy: number): Camera {
  return {
    x: camera.x - dx / camera.z,
    y: camera.y - dy / camera.z,
    z: camera.z,
  };
}

export function panCameraToValue(camera: Camera, x: number, y: number): Camera {
  return {
    x,
    y,
    z: camera.z,
  };
}

export function zoomCamera(camera: Camera, point: Point, dz: number): Camera {
  const zoom = camera.z - dz * camera.z;
  const p1 = screenToCanvas(point, camera);
  const p2 = screenToCanvas(point, { ...camera, z: zoom });

  return {
    x: camera.x + (p2.x - p1.x),
    y: camera.y + (p2.y - p1.y),
    z: zoom,
  };
}

export function zoomCameraToValue(
  camera: Camera,
  point: Point,
  zoom: number
): Camera {
  const p1 = screenToCanvas(point, camera);
  const p2 = screenToCanvas(point, { ...camera, z: zoom });

  return {
    x: camera.x + (p2.x - p1.x),
    y: camera.y + (p2.y - p1.y),
    z: zoom,
  };
}

export function zoomIn(camera: Camera): Camera {
  const i = Math.round(camera.z * 100) / 25;
  const nextZoom = (i + 1) * 0.25;
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  return zoomCamera(camera, center, camera.z - nextZoom);
}

export function zoomOut(camera: Camera): Camera {
  const i = Math.round(camera.z * 100) / 25;
  const nextZoom = (i - 1) * 0.25;
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  return zoomCamera(camera, center, camera.z - nextZoom);
}

export function zoomTo(camera: Camera, percent: number): Camera {
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  return zoomCameraToValue(camera, center, percent);
}
