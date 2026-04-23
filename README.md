# App_COSAPS
Mobile app for project COSAPS from FACFISIO /UFJF, made with react native and mysql

## Instruções para build de desenvolvimento
### Frontend
A implementação atual do frontend do projeto usa React Native com o expo, para executar o projeto é necessário carregar as dependências e fazer o build do projeto usando o expo:

```
git clone 
cd AppCosaps/frontend
npm i
yarn 
npx prebuild
npx expo run:android
```

- A dependência do build é o Java JDK 17:
    - https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
    - ``` sudo {gerenciador de pacotes da distro} install openjdk-17-jdk ``` em ambientes linux
- A execução do projeto depende de um emulador de android SDK compatível sendo executado na máquina (como Android Studio, Genymotion, etc)




### Backend
A implementação do back está sendo estruturada, atualmente usa firebase para login e armazenamento
