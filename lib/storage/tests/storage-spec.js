// handy Storage单元测试
define(function (require){
    var Storage = require('../src/storage');

    describe('Storage',function (){
        afterEach(function (){
            Storage.clear();
        });

        it('Make sure Storage has get,set,remove,keys and clear method.',function (){
            var methods = 'get,set,remove,keys,clear'.split(',');

            methods.forEach(function (method){
                expect(Storage[method]).toBeDefined();
            });
        });
        it('Saving data and the data is String.',function (){
            Storage.set('handy',true);
            var handy = Storage.get('handy');
            expect(handy).toBe('true');
        });
        it('When set the value is null,equal to remove.',function (){
            var i = 0;
            Storage.set('handy',null);
            expect(Storage.get('handy')).toBeNull();
        });
        it('Test change:key custom event. ',function (){
            var i = 0;
            Storage.on('change:handy',function (){
                i++;
            });
            Storage.set('handy',false);
            Storage.trigger('change:handy');
            expect(i).toBe(1);
            expect(Storage.get('handy')).toBe('false');
        });
        it('Removing data and test remove:key comtom event.',function (){
            var i = 0;
            Storage.remove('handy');
            Storage.on('remove:handy',function (){
                i++;
            });
            Storage.trigger('remove:handy');
            expect(i).toBe(1);
            expect(Storage.get('handy')).toBeNull();
        });
        it('Keys method return Array.',function (){
            Storage.set('handy',true);
            Storage.set('version',1.0);
            expect(toString.call(Storage.keys())).toBe('[object Array]');
            expect(Storage.keys().length).toBe(2);
        });
        it('Clear just now saved data.',function (){
            var i=0;
            Storage.on('clear',function (){i++;});
            Storage.clear();
            expect(Storage.keys().length).toBe(0);
            expect(i).toBe(1);
            expect(Storage.get('handy')).toBeNull();
        });
    });
});