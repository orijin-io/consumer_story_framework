
const getNativeLocation = () =>
  new Promise(async (resolve, reject) => {
    console.log("Getting location web");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        location => {
          resolve(location.coords);
        },
        error => {
          resolve(null);
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      reject("Location not supported");
    }
  });

export const getCurrentLocation = (): Promise<any> =>
  new Promise(async (resolve, reject) => {
    try {
      const latLong = await getNativeLocation();

      resolve(latLong);
    } catch (error) {
      reject(error);
    }
  });


