# App_COSAPS
Mobile app for project COSAPS from FACFISIO /UFJF, made with react native

## Instructions for development build
### Frontend
The actual implementation uses react native with expo, for execute the project is necessary to install de dependencies and build with expo:

```
git clone "https://github.com/cosapsufjf/App_COSAPS.git"
cd AppCosaps/frontend
npm i
yarn 
npx prebuild
npx expo run:android
```
- The main build dependencie is java JDK 17 (for gradle):
    - https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
    - ``` sudo {system package manager} install openjdk-17-jdk ``` in linux enviroments
      
- The execution of the project depends on a android SDK compatible emulator being executed on your machine (Android Studio, Genymotion, etc)
  
Other dependencies:
- Autenticantion Service:
    - Saas firebase
- APIs:
    - Fatsecret (For search nutritional information of food)

All the critical credentials (API Keys, Google Services jsons, and etc) must be collected with the project responsibles
