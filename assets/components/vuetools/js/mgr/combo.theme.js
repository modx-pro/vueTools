/**
 * System setting combo for vuetools.theme (aura | modx).
 * Loaded by VueCoreManager on manager pages.
 */
MODx.combo.VueToolsTheme = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data: [['Aura','aura'],['Modx','modx']]
        })
        ,displayField: 'd'
        ,valueField: 'v'
        ,mode: 'local'
        ,triggerAction: 'all'
        ,editable: false
        ,selectOnFocus: false
        ,preventRender: true
        ,forceSelection: true
        ,typeAhead: false
    });
    MODx.combo.VueToolsTheme.superclass.constructor.call(this,config);
};
Ext.extend(MODx.combo.VueToolsTheme,MODx.combo.ComboBox);
Ext.reg('vuetools-combo-theme',MODx.combo.VueToolsTheme);
