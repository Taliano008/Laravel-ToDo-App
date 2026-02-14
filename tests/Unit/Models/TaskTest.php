<?php

namespace Tests\Unit\Models;

use App\Models\Category;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_belongs_to_user_and_category(): void
    {
        $task = Task::factory()->withCategory()->create();

        $this->assertInstanceOf(User::class, $task->user);
        $this->assertInstanceOf(Category::class, $task->category);
    }

    public function test_pending_scope_filters_pending_tasks(): void
    {
        Task::factory()->create(['status' => 'pending']);
        Task::factory()->create(['status' => 'completed']);

        $this->assertSame(1, Task::pending()->count());
    }

    public function test_completed_scope_filters_completed_tasks(): void
    {
        Task::factory()->create(['status' => 'completed']);
        Task::factory()->create(['status' => 'pending']);

        $this->assertSame(1, Task::completed()->count());
    }
}
