import smartpy as sp


@sp.module
def main():
    class Escrow(sp.Contract):
        def __init__(
            self, owner, fromOwner, counterparty, fromCounterparty, epoch, hashedSecret
        ):
            self.data.fromOwner = fromOwner
            self.data.fromCounterparty = fromCounterparty
            self.data.balanceOwner = sp.tez(0)
            self.data.balanceCounterparty = sp.tez(0)
            self.data.hashedSecret = hashedSecret
            self.data.epoch = epoch
            self.data.owner = owner
            self.data.counterparty = counterparty

        @sp.entrypoint
        def addBalanceOwner(self):
            assert self.data.balanceOwner == sp.tez(0)
            assert sp.amount == self.data.fromOwner
            self.data.balanceOwner = self.data.fromOwner

        @sp.entrypoint
        def addBalanceCounterparty(self):
            assert self.data.balanceCounterparty == sp.tez(0)
            assert sp.amount == self.data.fromCounterparty
            self.data.balanceCounterparty = self.data.fromCounterparty

        @sp.private(with_storage="read-write", with_operations=True)
        def claim(self, identity):
            assert sp.sender == identity
            sp.send(identity, self.data.balanceOwner + self.data.balanceCounterparty)
            self.data.balanceOwner = sp.tez(0)
            self.data.balanceCounterparty = sp.tez(0)

        @sp.entrypoint
        def claimCounterparty(self, params):
            assert sp.now < self.data.epoch
            assert self.data.hashedSecret == sp.blake2b(params.secret)
            self.claim(self.data.counterparty)

        @sp.entrypoint
        def claimOwner(self):
            assert self.data.epoch < sp.now
            self.claim(self.data.owner)

@sp.add_test()
def test():
    admin = sp.address("tz1apnqLLUKtw6b5ih3BNr61KNG5FeQTjrCD")
    collegue = sp.address("tz1QqdGvik1QaaoEVR5wAs3M8vdGTC4VLhjR")
    s = sp.test_scenario("Ducat test", main)
    hashSecret = sp.blake2b(sp.bytes("0x01223344"))

    c1 = main.Escrow(
        admin, sp.tez(50), collegue, sp.tez(4), sp.timestamp(123), hashSecret
    )
    s += c1



    c1.addBalanceOwner(_sender=admin, _amount=sp.tez(50))
    c1.addBalanceCounterparty(_sender=collegue, _amount=sp.tez(4))
    s.h3("Erronous secret")
    c1.claimCounterparty(secret=sp.bytes("0x01223343"), _sender=collegue, _valid=False)
    s.h3("Correct secret")
    c1.claimCounterparty(secret=sp.bytes("0x01223344"), _sender=collegue)