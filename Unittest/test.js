describe('Strategy in round robin', function() {
    describe("with one proxy setting", function() {
        basic_options["backends"] = [
            {
                host: "127.0.0.1",
                port: 3000,
                https: false
            }
        ];
        var proxy = new lbProxy.LoadBalancingProxy(basic_options);
        var strategy = new strategies.RoundRobinStrategy(proxy.proxies, basic_options);

        it("should always return the first one", function(done) {
            strategy(req, res, function(err, p) {
                should.not.exist(err);
                p.target.host.should.equal('127.0.0.1');
                p.target.port.should.equal(3000);
                done();
            });
        });
});