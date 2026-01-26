export const avatarToUrl = (avatarName?: string) => {
    return avatarName ? `${process.env.BASE_URL}/images/avatar/${avatarName}`: '';
}