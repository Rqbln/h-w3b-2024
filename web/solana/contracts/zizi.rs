use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,      // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");

    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut greeting_counter = GreetingAccount::try_from_slice(&account.data.borrow())?;
    greeting_counter.counter += 1;
    greeting_counter.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Greeted {} time(s)!", greeting_counter.counter);

    Ok(())
}

#[derive(Debug, Default, Clone)]
pub struct GreetingAccount {
    pub counter: u32,
}

impl borsh::BorshDeserialize for GreetingAccount {}
impl borsh::BorshSerialize for GreetingAccount {}
