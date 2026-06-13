export const APP_VERSION={
    isUpdate: true,
    release: {
        major: 1,
        minor: 0,
        patch: 0
    },
    release_date:  dateEsp(13,6,2026)
};

export const APP_VERSION_UPDATE_LIST = {
    es: ['Nuevos idiomas agregados','Mejora en la sección de notificaciones','Agregamos más información en el acceso directo'],
    en: ['New languages added','Improves on notification section','We added more information to the shortcut.'],
    pt: ['Novos idiomas adicionados','Melhora a seção de notificações.','Adicionamos mais informações ao Inicio > atalho.'],
    it: ['Nuove lingue aggiunte','Calcolatrice di confronto','Notificatore di aggiornamenti'],
    fr: ['Nouvelles langues ajoutées','Calculatrice de comparaison','Notificateur de mises à jour'],
    de: ['Neue Sprachen hinzugefügt','Vergleichsrechner','Update-Benachrichtigun'],
    ru: ['Добавлены новые языки','Калькулятор сравнения','Уведомления o6 обновлениях'],
    ja: ['新しい言語が追加されました','比較計算機','更新通知'],
    tr: ['Yeni diller eklendi','Karşılaştırma hesaplayıcısı','Güncelleme bildirimcisi'],
    zh: ['添加了新语言','比较计算器','更新通知'],
    hi: ['नई भाषाएँ जोड़ी गईं','तुलना कैलकुलेटर','अपडेट्स के लिए नोटिफिकेशन']
}

function dateEsp(dia:number, mes:number,  anio:number){
    return new Date(anio, mes-1, dia);
}