export const getStorage = (key) => {
  if (!localStorage) return;

  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(`Error getting item ${key} from localStorage`, err);
  }
};

export const setStorage = (key,item) => {
  if (!localStorage) return;

  try {
        console.log('page storage',key,item);
    return localStorage.setItem(key,JSON.stringify(item));
  } catch (err) {
    console.error(`Error storing item ${key} to localStorage`, err);
  }
};

export const clearStorege = (key) => {
  if (!localStorage) return;

  try {
    return localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error remove item ${key} to localStorage`, err);
  }
};
