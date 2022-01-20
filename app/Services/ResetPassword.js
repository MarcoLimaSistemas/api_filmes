const Hash = use("Hash");

async function newPassword(auth, request) {
  // console.log('entrei aqui')
  const user = await auth.getUser();

  const { old_password: oldPassword, new_password: newPassword } = request.only(
    ["old_password", "new_password"],
  );

  const isSame = await Hash.verify(oldPassword, user.password);

  if (isSame) {
    // const safePassword= await Hash.make(new_password);

    await user.merge({ password: newPassword });

    await user.save();

    return true;
  } else {
    return false;
  }
}

module.exports = {
  newPassword,
};
