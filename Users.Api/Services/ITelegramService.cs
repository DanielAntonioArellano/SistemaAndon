using System.Threading;
using System.Threading.Tasks;

namespace Users.Api.Services
{
    public interface ITelegramService
    {
        Task<bool> SendMessageAsync(string chatId, string text, CancellationToken ct = default);
        Task<bool> SendMessageAsync(string text, CancellationToken ct = default);
    }
}
