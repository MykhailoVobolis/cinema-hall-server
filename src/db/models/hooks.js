// Mongoose хук для повернення правильного статусу помилки 400 замість 500 при додаванні("save") об'єкта що не відповідає схемі валідації
export const mongooseSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

// Mongoose хук для додавання налаштувань оновлення перед ("pre") оновленням об'екта
export const setUpdateSettings = function (next) {
  this.options.new = true; // Повернення об'екту після оновлення
  this.options.runValidators = true; // Обов'язково валідувати при оновленні об'екта
  next();
};
